# AI Chat Width Controller

一个简单实用的浏览器扩展，用于调整 AI 对话网站的页面宽度，提供更舒适的阅读体验。

## ✨ 功能特性

- 🖥️ **全宽模式**：将页面宽度扩展到 100%，充分利用屏幕空间
- 📱 **较宽模式**：两边各保留 120px 边距，平衡宽度与可读性
- 📄 **原始宽度**：恢复网站默认宽度
- 💾 **自动保存**：记住您的选择，下次访问自动应用
- 🎨 **美观界面**：现代化的渐变色 UI 设计
- ⚡ **即时生效**：无需刷新页面，点击即可切换

## 🌐 支持的网站

- [DeepSeek](https://chat.deepseek.com)
- [豆包](https://doubao.com)
- [元宝](https://yuanbao.tencent.com)
- [ChatGPT](https://chatgpt.com) / [OpenAI](https://chat.openai.com)
- [Gemini](https://gemini.google.com)

## 📦 安装方法

### Chrome / Edge 浏览器

1. 下载或克隆此项目到本地
2. 打开浏览器，进入扩展管理页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择项目文件夹 `wide-ai-page`
6. 扩展安装完成！

## 🚀 使用方法

1. 访问任意支持的 AI 对话网站
2. 点击浏览器工具栏中的扩展图标
3. 在弹出窗口中选择您想要的宽度模式：
   - **全宽模式 (100%)**：适合大屏幕用户
   - **较宽模式 (两边120px)**：平衡的宽度，适合多数场景
   - **原始宽度**：恢复网站默认样式
4. 页面会立即应用新的宽度设置

## 📁 项目结构

```
wide-ai-page/
├── manifest.json       # 扩展配置文件
├── popup.html          # 弹出窗口界面
├── popup.js            # 弹出窗口逻辑
├── content.js          # 内容脚本（修改页面样式）
├── content.css         # 内容样式
├── background.js       # 后台脚本
├── icons/              # 图标文件夹
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # 说明文档
```

## 🔧 技术实现

- **Manifest V3**：使用最新的浏览器扩展标准
- **Chrome Storage API**：持久化保存用户设置
- **Content Scripts**：动态注入样式修改页面布局
- **MutationObserver**：监听 DOM 变化，确保样式持续生效
- **响应式设计**：在小屏幕设备上自动调整边距

## 🎨 自定义

如果您想添加更多网站支持，可以编辑 `manifest.json` 和 `content.js`：

### 1. 在 manifest.json 中添加网站匹配规则：

```json
"content_scripts": [
  {
    "matches": [
      "*://your-website.com/*"
    ],
    ...
  }
]
```

### 2. 在 content.js 中添加网站配置：

```javascript
const siteConfigs = {
  'your-website.com': {
    selectors: [
      'main',
      '.your-container-class'
    ]
  }
};
```

## 📝 更新日志

### v1.0.0 (2024)
- 🎉 首次发布
- ✅ 支持 DeepSeek、豆包、元宝、ChatGPT、Gemini
- ✅ 三种宽度模式切换
- ✅ 设置自动保存
- ✅ 美观的渐变色 UI

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## ⚠️ 注意事项

- 首次安装后，需要刷新已打开的 AI 对话页面才能生效
- 某些网站可能会更新其页面结构，导致样式失效，请及时反馈
- 扩展仅修改页面显示样式，不会收集或修改任何数据

## 💡 提示

- 如果切换后样式没有生效，请尝试刷新页面
- 建议在大屏幕（≥1920px）上使用全宽模式
- 较宽模式在 1440px-1920px 屏幕上效果最佳

---

**享受更宽广的 AI 对话体验！** 🚀
