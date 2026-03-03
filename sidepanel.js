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
    const response = await fetch('http://127.0.0.1:18791/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    }).then(res => res.json()).catch(() => ({ reply: "OpenClaw 接口连接失败，请检查 Gateway 是否开启。但我依然在这里！" }));

    appendMessage('贾维斯', response.reply || "我收到消息了，老板！", 'jarvis');
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
