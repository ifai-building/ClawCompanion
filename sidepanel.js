document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (text) {
    appendMessage('用户', text, 'user');
    input.value = '';
    // TODO: 调用 OpenClaw API
    setTimeout(() => {
      appendMessage('贾维斯', '收到！功能还在开发中，先给老板点个赞 👍', 'jarvis');
    }, 500);
  }
});

function appendMessage(sender, text, className) {
  const container = document.getElementById('chat-container');
  const div = document.createElement('div');
  div.className = `message ${className}`;
  div.innerHTML = `<span class="${className}">${sender}:</span> ${text}`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
