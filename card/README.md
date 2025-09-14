# 个人简介卡片生成器

一个精美的个人简介卡片生成器，支持实时预览和高质量图片下载功能。无需安装，即开即用！

## ✨ 功能特色

### 🎨 内容自定义
- **个人信息**: 姓名、职位、邮箱、电话
- **个人简介**: 支持多行文本描述
- **技能标签**: 可添加多个技能标签，用逗号分隔
- **主题颜色**: 自定义卡片背景颜色

### 👀 实时预览
- **即时更新**: 编辑内容时卡片实时更新
- **所见即所得**: 直观的编辑体验
- **响应式设计**: 完美适配各种设备屏幕

### 🎨 现代化设计
- **精美UI**: 专业的卡片设计和配色
- **渐变背景**: 现代化的视觉效果
- **头像支持**: 集成随机头像生成
- **图标系统**: 使用emoji图标增强视觉效果

### 💾 卡片下载
- **PNG格式**: 支持高质量PNG图片下载
- **高清输出**: 2倍分辨率，保证图片清晰度
- **智能命名**: 自动生成文件名 `个人名片_姓名_日期.png`
- **一键下载**: 简单易用的下载功能

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 无需额外依赖或安装

### 使用方法

1. **打开应用**
   ```bash
   # 直接在浏览器中打开
   # 或者使用本地服务器
   python -m http.server 8000
   # 然后访问 http://localhost:8000
   ```

2. **编辑内容**
   - 在左侧编辑区域填写个人信息
   - 输入技能标签（用逗号分隔）
   - 选择喜欢的卡片颜色

3. **预览效果**
   - 右侧实时显示卡片效果
   - 所有更改即时反映在预览中

4. **下载卡片**
   - 点击"下载卡片"按钮
   - 自动生成高质量PNG图片
   - 文件自动保存到下载目录

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化标签，现代Web标准
- **CSS3**: Flexbox布局，动画效果，响应式设计
- **JavaScript ES6+**: 现代JavaScript特性
- **html2canvas**: DOM转图片功能

### 核心特性
- **零依赖**: 除html2canvas外无其他外部依赖
- **原生JS**: 使用原生JavaScript，无需构建工具
- **事件驱动**: 基于事件监听的实时更新机制
- **模块化**: 清晰的函数分离和职责划分

## 📁 项目结构

```
card/
├── index.html          # 主页面文件
├── style.css          # 样式文件
├── script.js          # 应用逻辑
└── README.md          # 项目文档
```

### 文件说明

#### index.html
- **语义化结构**: 使用header、main、section等语义化标签
- **响应式布局**: 采用Flexbox实现响应式设计
- **无障碍访问**: 添加适当的label和aria属性

#### style.css
- **模块化样式**: 按功能模块组织CSS代码
- **响应式设计**: 支持移动端和桌面端
- **动画效果**: 卡片悬停和交互动画
- **主题系统**: 支持动态颜色更换

#### script.js
- **事件管理**: 统一的事件监听器管理
- **实时更新**: DOM操作和数据同步
- **错误处理**: 完善的错误处理机制
- **文件下载**: html2canvas集成和图片生成

## 🔧 核心功能

### 1. 实时更新机制
```javascript
// 监听所有输入变化
function initializeEventListeners() {
    const inputs = ['name', 'title', 'email', 'phone', 'bio', 'skills', 'cardColor'];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', updateCard);
        element.addEventListener('change', updateCard);
    });
}
```

### 2. 技能标签处理
```javascript
// 智能分割和渲染技能标签
const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
skillsArray.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    skillsTags.appendChild(tag);
});
```

### 3. 高质量图片生成
```javascript
// 使用html2canvas生成高清图片
html2canvas(card, {
    backgroundColor: null,
    scale: 2,  // 2倍分辨率
    useCORS: true,
    logging: false,
    width: 400,
    height: card.offsetHeight
});
```

## 🎨 设计特色

### 视觉设计
- **现代化**: 采用现代卡片设计风格
- **专业感**: 适合商务和个人使用
- **个性化**: 支持颜色自定义
- **一致性**: 统一的设计语言

### 用户体验
- **直观操作**: 简单易懂的界面
- **即时反馈**: 实时预览效果
- **便捷下载**: 一键生成和下载
- **移动友好**: 响应式设计支持

## 🌐 浏览器兼容性

### 完全支持
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### 部分支持
- ⚠️ IE 11 (不支持html2canvas)
- ⚠️ 旧版移动浏览器

### 性能优化
- **图片优化**: 使用外部CDN加载html2canvas
- **DOM优化**: 最小化DOM操作
- **事件优化**: 使用事件委托减少监听器数量

## 🔧 开发指南

### 本地开发
1. 克隆项目到本地
2. 使用本地服务器避免CORS问题
3. 修改代码后直接刷新浏览器查看效果

### 自定义扩展
- **添加新字段**: 在HTML中添加输入框，在JavaScript中添加更新逻辑
- **修改样式**: 编辑style.css文件
- **新增功能**: 在script.js中添加新函数

### 发布部署
- **静态部署**: 可部署到任何静态网站托管服务
- **CDN优化**: 建议使用CDN加速html2canvas加载
- **缓存策略**: 设置适当的缓存头部

## 🐛 常见问题

### 下载失败
- **原因**: 浏览器安全策略或网络问题
- **解决**: 尝试使用HTTPS或检查网络连接

### 图片质量
- **原因**: html2canvas配置问题
- **解决**: 确保scale参数设置为2

### 样式问题
- **原因**: 浏览器兼容性
- **解决**: 添加CSS前缀或使用polyfill

## 📝 更新日志

### v1.0.0 (2024-01-15)
- 初始版本发布
- 基本卡片生成功能
- 实时预览功能
- PNG下载功能
- 响应式设计

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 贡献方式
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

### 开发规范
- 使用现代JavaScript特性
- 遵循CSS BEM命名规范
- 保持代码注释完整
- 确保跨浏览器兼容性

## 📄 许可证

本项目采用 MIT 许可证。

---

**让个人名片制作变得简单而优雅！** 🎨✨