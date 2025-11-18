// 网站特定的选择器配置
const siteConfigs = {
  'chat.deepseek.com': {
    selector: '.ds-scroll-area:has(.ds-message)',
    cssProperty: 'padding',
    fullValue: '0 20px',
    wideValue: '0 120px'
  },
  'doubao.com': {
    selector: '.chrome70-container',
    cssProperty: 'padding',
    fullValue: '0 20px',
    wideValue: '0 120px'
  },
  'yuanbao.tencent.com': {
    selector: '.agent-chat__list__item__content',
    cssProperty: 'max-width',
    fullValue: '100%',
    wideValue: 'calc(100% - 240px)'
  },
  'chatgpt.com': {
    selector: '.max-w-\\(--thread-content-max-width\\)',
    cssProperty: 'max-width',
    fullValue: '100%',
    wideValue: 'calc(100% - 240px)'
  },
  'chat.openai.com': {
    selector: '.max-w-\\(--thread-content-max-width\\)',
    cssProperty: 'max-width',
    fullValue: '100%',
    wideValue: 'calc(100% - 240px)'
  },
  'gemini.google.com': {
    selector: '.conversation-container',
    cssProperty: 'max-width',
    fullValue: '100%',
    wideValue: 'calc(100% - 240px)'
  }
};

// 获取当前网站的配置
function getSiteConfig() {
  const hostname = window.location.hostname;
  for (const [domain, config] of Object.entries(siteConfigs)) {
    if (hostname.includes(domain)) {
      return config;
    }
  }
  return null;
}

// 应用宽度样式
function applyWidth(mode) {
  const config = getSiteConfig();
  if (!config) return;

  // 移除之前的自定义样式
  const existingStyle = document.getElementById('ai-width-controller-style');
  if (existingStyle) {
    existingStyle.remove();
  }

  // 移除所有宽度类
  document.body.classList.remove('full', 'wide');

  if (mode === 'original') {
    // 原始宽度，不添加任何类
    return;
  }

  // 创建样式元素
  const style = document.createElement('style');
  style.id = 'ai-width-controller-style';
  
  let cssRules = '';
  
  if (mode === 'full') {
    // 全宽模式
    cssRules = `
      body.full ${config.selector} {
        ${config.cssProperty}: ${config.fullValue} !important;
      }
    `;
    document.body.classList.add('full');
  } else if (mode === 'wide') {
    // 较宽模式（两边各120px）
    cssRules = `
      body.wide ${config.selector} {
        ${config.cssProperty}: ${config.wideValue} !important;
      }
    `;
    document.body.classList.add('wide');
  }
  
  style.textContent = cssRules;
  document.head.appendChild(style);
  
  // 保存当前模式
  chrome.storage.sync.set({ widthMode: mode });
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setWidth') {
    applyWidth(request.mode);
    sendResponse({ success: true });
  }
  return true;
});

// 页面加载时应用保存的设置
chrome.storage.sync.get(['widthMode'], (result) => {
  const mode = result.widthMode || 'original';
  if (mode !== 'original') {
    applyWidth(mode);
  }
});

// 监听DOM变化，确保样式持续生效
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['widthMode'], (result) => {
    const mode = result.widthMode || 'original';
    if (mode !== 'original') {
      const hasClass = document.body.classList.contains('full') || 
                      document.body.classList.contains('wide');
      if (!hasClass) {
        applyWidth(mode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
