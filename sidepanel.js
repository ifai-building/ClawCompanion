document.getElementById('send-btn').addEventListener('click', async () => {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('老板', text, 'user');
  input.value = '';

  // 获取页面上下文
  let pageInfo = { title: "未知", selection: "" };
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      pageInfo = await chrome.tabs.sendMessage(tab.id, { action: "getPageInfo" });
      document.getElementById('page-context').style.display = 'block';
      document.getElementById('page-title').textContent = pageInfo.title;
    }
  } catch (err) {
    console.log("无法获取页面信息:", err);
  }

  // 构造请求给 OpenClaw
  const prompt = `[上下文: 网页标题 "${pageInfo.title}", 选中文本 "${pageInfo.selection}"]\n\n老板说: ${text}`;
  
  try {
    // 假设 OpenClaw 本地接口 (需配合实际 API 调整)
    // 这里使用模拟回复或尝试调用 127.0.0.1:18791 (如果 API 允许直接 fetch)
    // 调用 OpenClaw 默认的本地 Gateway 接口 (OpenAI 兼容格式)
    const response = await fetch('http://127.0.0.1:8790/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer openclaw' // 本地调试默认 token
      },
      body: JSON.stringify({ 
        model: "default", 
        messages: [{ role: "user", content: prompt }] 
      })
    }).then(res => res.json()).catch(err => {
      console.error("OpenClaw API Error:", err);
      return { error: true, reply: "报告老板：OpenClaw Gateway 连接失败，请检查 8790 端口是否开启服务。" };
    });

    const replyText = response.error ? response.reply : (response.choices?.[0]?.message?.content || "（收到，但未解析到有效回复）");
    appendMessage('贾维斯', replyText, 'jarvis');
  } catch (error) {
    appendMessage('贾维斯', "汇报老板：连接 OpenClaw 出了一点小差错。", 'jarvis');
  }
});

function appendMessage(sender, text, className) {
  const container = document.getElementById('chat-container');
  const div = document.createElement('div');
  div.className = 'message';
  div.innerHTML = `<div class="${className}">${sender}:</div><div>${text}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
