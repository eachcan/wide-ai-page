// 获取当前模式并更新UI
async function updateUI() {
  const result = await chrome.storage.sync.get(['widthMode']);
  const currentMode = result.widthMode || 'original';
  
  // 更新按钮状态
  document.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === currentMode) {
      btn.classList.add('active');
    }
  });
}

// 显示状态消息
function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.classList.add('show');
  
  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
}

// 设置宽度模式
async function setWidthMode(mode) {
  // 保存到存储
  await chrome.storage.sync.set({ widthMode: mode });
  
  // 获取当前活动标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // 检查是否是支持的网站
  const supportedDomains = [
    'chat.deepseek.com',
    'doubao.com',
    'yuanbao.tencent.com',
    'chatgpt.com',
    'chat.openai.com',
    'gemini.google.com',
    'grok.com'
  ];
  
  const isSupported = supportedDomains.some(domain => tab.url.includes(domain));
  
  if (isSupported) {
    // 发送消息到内容脚本
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'setWidth', mode: mode });
      
      let modeText = '';
      switch(mode) {
        case 'full': modeText = '全宽模式'; break;
        case 'wide': modeText = '较宽模式'; break;
        case 'original': modeText = '原始宽度'; break;
      }
      showStatus(`✓ 已切换到${modeText}`);
    } catch (error) {
      showStatus('⚠️ 请刷新页面后重试');
    }
  } else {
    showStatus('⚠️ 当前页面不支持');
  }
  
  // 更新UI
  updateUI();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  
  // 绑定按钮事件
  document.getElementById('fullWidth').addEventListener('click', () => {
    setWidthMode('full');
  });
  
  document.getElementById('wideWidth').addEventListener('click', () => {
    setWidthMode('wide');
  });
  
  document.getElementById('originalWidth').addEventListener('click', () => {
    setWidthMode('original');
  });
});
