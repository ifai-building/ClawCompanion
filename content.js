function getPageInfo() {
  const selection = window.getSelection().toString();
  return {
    title: document.title,
    url: window.location.href,
    selection: selection
  };
}

// 监听来自 sidepanel 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageInfo") {
    sendResponse(getPageInfo());
  }
});
