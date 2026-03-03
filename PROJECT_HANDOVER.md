# ClawCompanion (爪爪搭子) - 开发续接指南

本文档旨在确保在新的会话或由不同 Agent 接手时，能快速理解项目进度并继续开发。

## 1. 项目愿景
打造一个集成在 Chrome 侧边栏的 OpenClaw 交互插件。用户可以在浏览任何网页时，直接与贾维斯（OpenClaw）交流，并让它感知当前网页的内容（如标题、选中文字）辅助创作或“吃瓜”。

## 2. 当前技术架构
- **Manifest V3**: 使用 Chrome 最新的插件标准。
- **Side Panel**: 利用 `chrome.sidePanel` API 实现常驻侧边栏交互。
- **Content Scripts (`content.js`)**: 负责向页面注入脚本，监听选中文字并将数据传回插件。
- **Background SW (`background.js`)**: 处理插件启动行为。
- **Frontend (`sidepanel.html/js`)**: 基于原生 JS 的简易聊天界面，已预留 API 调用接口。

## 3. 已实现功能 (截至 2026-03-03)
- [x] 项目基础骨架搭建。
- [x] 侧边栏 UI 实现（包含消息列表、输入框、上下文显示区）。
- [x] 网页上下文抓取（标题、当前选中文字）。
- [x] Git 仓库初始化与远程同步 ([ifai-building/ClawCompanion](https://github.com/ifai-building/ClawCompanion))。

## 4. 待办事项 (Next Steps)
- [ ] **接口打通**: 在 `sidepanel.js` 中接入真实的 OpenClaw 消息接口（需处理跨域或通过本地代理）。
- [ ] **UI/UX 优化**: 引入更美观的 CSS 框架或自定义样式，使其更符合“像素/赛博”风格。
- [ ] **多会话支持**: 允许用户在插件中切换不同的 Agent 角色。
- [ ] **自动总结**: 点击按钮自动将当前页面内容发送给 OpenClaw 生成摘要。

## 5. 开发环境与调试
- 目录：`/Users/aipm/.openclaw/workspace/ClawCompanion`
- 调试：在 Chrome 打开 `chrome://extensions/`，加载该目录。修改代码后需点击插件页面的“刷新”图标。

---
*由“码字特种兵”贾维斯整理，愿下一次会话的我也能如此优秀。* 🐾
