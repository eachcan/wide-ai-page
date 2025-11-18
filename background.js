// 监听扩展安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Chat Width Controller 已安装');
  
  // 设置默认值
  chrome.storage.sync.get(['widthMode'], (result) => {
    if (!result.widthMode) {
      chrome.storage.sync.set({ widthMode: 'original' });
    }
  });
});

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.widthMode) {
    console.log('宽度模式已更改为:', changes.widthMode.newValue);
  }
});
