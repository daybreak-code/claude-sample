# 飞书书签保存器 Chrome扩展

一个强大的Chrome浏览器扩展，可以快速将网页URL保存到飞书多维表格中。支持URL唯一性检查、智能信息提取和批量管理。

## ✨ 主要功能

### 🚀 核心功能
- **一键保存**: 快速将当前网页保存到飞书多维表格
- **智能提取**: 自动提取页面标题、描述和关键词
- **URL去重**: 自动检测重复URL，支持覆盖更新
- **标签管理**: 支持自定义标签分类
- **批量操作**: 支持批量导入导出设置

### 🔧 高级特性
- **Manifest V3**: 使用最新的Chrome扩展标准
- **智能识别**: 自动识别页面内容并填充表单
- **配置灵活**: 支持多个飞书应用和表格配置
- **安全可靠**: 数据直接存储在您的飞书表格中
- **实时同步**: 与飞书表格实时同步

### 🎨 用户体验
- **响应式设计**: 完美适配各种屏幕尺寸
- **暗色模式**: 支持系统暗色模式
- **快捷键支持**: Ctrl+S快速保存，Ctrl+E智能提取
- **实时反馈**: 清晰的成功/错误状态提示
- **连接测试**: 内置连接测试功能

## 📦 安装方法

### 方法一：开发者模式安装

1. 克隆或下载本项目到本地
2. 打开Chrome浏览器，输入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目文件夹
6. 扩展安装完成！

### 方法二：打包安装

1. 在扩展管理页面点击"打包扩展程序"
2. 选择项目文件夹，生成.crx文件
3. 双击.crx文件进行安装

## 🔧 配置说明

### 1. 创建飞书应用

1. 访问 [飞书开放平台](https://open.feishu.cn)
2. 点击"创建应用" → "自建应用"
3. 填写应用名称和描述
4. 在"权限管理"中添加权限：
   - `查看、评论、编辑和管理多维表格`

### 2. 获取应用凭据

在应用详情页面获取：
- **App ID**: 应用的唯一标识符
- **App Secret**: 应用的密钥（请妥善保管）

### 3. 创建多维表格

1. 在飞书中创建新的多维表格
2. 添加以下字段：
   - `网站地址` - 超链接类型
   - `网站的中文说明` - 文本类型
   - `网站的备注` - 多行文本类型
   - `网站的标签` - 单选类型
   - `创建时间` - 日期时间类型

3. 设置单选字段的选项：
   - 工作、学习、娱乐、工具、新闻、购物、社交、其他

### 4. 配置表格权限

1. 点击表格右上角的"分享"按钮
2. 添加您的应用为协作者
3. 设置权限为"可编辑"
4. 复制表格的完整URL

### 5. 配置扩展

1. 右键点击扩展图标，选择"选项"
2. 填入App ID、App Secret和表格URL
3. 点击"测试连接"确保配置正确
4. 点击"保存配置"

## 📖 使用方法

### 基本使用

1. 在浏览器中打开要保存的网页
2. 点击扩展图标打开弹出窗口
3. 填写网站说明（必填）
4. 选择标签（可选）
5. 添加备注（可选）
6. 点击"保存到飞书"

### 高级功能

#### 智能提取
- 点击"自动提取"按钮，自动填充页面描述
- 支持从meta标签、h1标题等提取信息
- 智能推荐标签

#### URL去重
- 保存时自动检查URL是否已存在
- 如果存在，显示确认对话框
- 可选择覆盖更新或取消操作

#### 快捷键
- `Ctrl+S` - 保存到飞书
- `Ctrl+E` - 智能提取信息
- `Ctrl+C` - 复制URL

## 🛠️ 开发说明

### 项目结构

```
browser-favorite-link/
├── manifest.json          # 扩展配置文件 (Manifest V3)
├── popup.html            # 弹出窗口界面
├── popup.js              # 弹出窗口逻辑 (PopupManager类)
├── popup.css             # 弹出窗口样式
├── options.html          # 选项页面
├── options.js            # 选项页面逻辑 (OptionsManager类)
├── options.css           # 选项页面样式
├── background.js          # Service Worker (BackgroundService类)
├── common.js             # 公共函数和常量 (Utils类, API配置)
├── record-manager.js     # 记录管理器 (RecordManager类)
├── icons/                # 图标文件
└── README.md             # 项目说明
```

### 核心组件

#### Service Worker (background.js)
- **BackgroundService类**: 核心服务管理器
- 处理所有飞书API调用和消息路由
- 管理扩展生命周期和事件监听
- 实现消息异步处理和错误管理
- 支持保存、更新、检查、测试等多种操作

#### Popup 界面 (popup.html/js/css)
- **PopupManager类**: 用户界面管理器
- 实时页面信息加载和显示
- 智能内容提取和表单自动填充
- URL唯一性检查和确认对话框
- 键盘快捷键支持 (Ctrl+S, Ctrl+E)
- 响应式设计和暗色模式支持

#### Options 页面 (options.html/js/css)
- **OptionsManager类**: 配置管理器
- 飞书应用凭据配置和管理
- 实时连接测试和验证
- 设置的本地存储和同步
- 配置导入导出功能

#### 记录管理器 (record-manager.js)
- **RecordManager类**: 飞书API封装器
- 访问令牌获取和缓存管理
- 表格和字段信息获取
- 记录的CRUD操作 (创建、读取、更新)
- 错误处理和重试机制

#### 公共工具 (common.js)
- **Utils类**: 通用工具函数
- 配置验证和错误处理
- URL解析和表格ID提取
- 消息类型常量定义
- API配置和端点管理

### API集成

使用飞书开放平台的多维表格API：

#### 认证流程
- **tenant_access_token**: 使用内部应用认证方式
- **令牌缓存**: 自动管理令牌有效期，提前5分钟刷新
- **错误处理**: 完整的API错误代码处理和用户友好的错误提示

#### 核心API端点
```
POST /auth/v3/tenant_access_token/internal     # 获取访问令牌
GET  /bitable/v1/apps/{appToken}/tables          # 获取表格列表
GET  /bitable/v1/apps/{appToken}/tables/{tableId}/fields?view_id={viewId}  # 获取字段信息
POST /bitable/v1/apps/{appToken}/tables/{tableId}/records  # 添加记录
PATCH /bitable/v1/apps/{appToken}/tables/{tableId}/records/{recordId}  # 更新记录
GET  /bitable/v1/apps/{appToken}/tables/{tableId}/records?filter={filter}  # 查询记录
```

#### URL解析机制
- **完整URL支持**: 支持包含appToken、tableId、viewId的完整表格URL
- **自动解析**: `parseTableUrl`函数自动提取所需参数
- **兼容性**: 支持不带table参数的URL，自动获取第一个表格

### 数据流架构

```
用户操作 → Popup界面 → 消息传递 → Service Worker → 飞书API
    ↓
UI状态更新 ← 消息响应 ← API结果处理 ← 数据处理 ← HTTP请求
```

#### 详细流程
1. **用户交互**: 在popup中填写信息，点击保存
2. **消息传递**: popup.js通过chrome.runtime.sendMessage发送消息
3. **服务处理**: background.js接收消息，调用RecordManager处理
4. **API调用**: 通过fetch API调用飞书开放平台接口
5. **数据处理**: 处理API响应，格式化数据
6. **状态更新**: 通过sendResponse返回结果，更新UI状态

### 消息类型系统

```javascript
// 消息类型常量 (common.js)
const MESSAGE_TYPES = {
  SAVE_URL: 'SAVE_URL',           // 保存URL
  UPDATE_URL: 'UPDATE_URL',       // 更新URL
  CHECK_URL: 'CHECK_URL',         // 检查URL是否存在
  TEST_CONNECTION: 'TEST_CONNECTION',  // 测试连接
  GET_FIELDS: 'GET_FIELDS'        // 获取字段信息
};
```

## 🐛 故障排除

### 常见问题

#### 1. 连接测试失败
- 检查App ID和App Secret是否正确
- 确保应用已发布到企业内
- 检查表格URL格式是否正确
- 确保表格已分享给应用

#### 2. 保存失败
- 检查字段名称是否与表格一致
- 确保应用有编辑权限
- 检查网络连接是否正常

#### 3. 权限错误
- 确保应用有"查看、评论、编辑和管理多维表格"权限
- 确保表格已正确分享给应用

#### 4. 字段错误
- 检查表格字段名称是否正确
- 确保字段类型匹配

### 错误代码

| 代码 | 说明 | 解决方案 |
|------|------|----------|
| 91402 | 表格不存在或无权限 | 检查表格URL和权限设置 |
| 91403 | 权限不足 | 检查应用权限和表格分享 |
| 1254043 | 字段名称不匹配 | 检查字段名称 |
| 1254060 | 文本字段转换失败 | 检查文本字段格式 |
| 1254061 | 超链接字段转换失败 | 检查URL字段格式 |
| 1254062 | 单选字段转换失败 | 检查单选字段格式 |
| 1254064 | 日期时间字段转换失败 | 检查日期字段格式 |

## 🔧 开发指南

### 开发环境搭建

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd browser-favorite-link
   ```

2. **加载扩展**
   - 打开Chrome浏览器，访问 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

### 调试技巧

#### Service Worker调试
1. 在扩展管理页面点击"检查视图" → "Service Worker"
2. 使用Console查看日志输出
3. 使用Network面板监控API请求
4. 使用Application面板查看Storage数据

#### Popup调试
1. 右键点击扩展图标，选择"检查弹出式窗口"
2. 使用Elements面板检查UI结构
3. 使用Console查看交互日志
4. 使用Sources面板设置断点调试

#### 常用调试命令
```javascript
// 查看存储的配置
chrome.storage.sync.get(null, console.log);

// 清除存储的配置
chrome.storage.sync.clear();

// 发送测试消息
chrome.runtime.sendMessage({type: 'TEST_CONNECTION', data: {...}});
```

### 代码规范

#### JavaScript规范
- 使用ES6+语法特性
- 采用类组织代码结构
- 使用async/await处理异步操作
- 保持函数职责单一
- 添加适当的错误处理

#### 命名约定
- 类名使用PascalCase: `PopupManager`
- 函数名使用camelCase: `saveToFeishu`
- 常量使用UPPER_SNAKE_CASE: `MESSAGE_TYPES`
- 私有方法使用下划线前缀: `_privateMethod`

#### 注释规范
- 类和主要方法添加JSDoc注释
- 复杂逻辑添加行内注释
- API调用添加参数说明
- 错误处理添加错误代码说明

### 测试策略

#### 功能测试
1. **连接测试**: 验证飞书API连接
2. **保存测试**: 测试URL保存功能
3. **更新测试**: 测试URL更新功能
4. **重复测试**: 测试URL重复检查

#### 边界测试
- 空配置测试
- 无效URL测试
- 网络异常测试
- API限制测试

#### 性能测试
- 令牌缓存效率
- 消息传递延迟
- UI响应速度
- 内存使用情况

### 发布流程

1. **版本更新**: 修改manifest.json中的version
2. **代码审查**: 检查代码质量和规范
3. **功能测试**: 确保所有功能正常
4. **打包扩展**: 使用Chrome扩展打包工具
5. **发布文档**: 更新README和变更日志

## 🔄 更新日志

### v1.0.0 (2024-01-15)
- 初始版本发布
- 支持基本的URL保存功能
- 智能信息提取
- URL唯一性检查和覆盖更新
- 完整的配置管理界面
- Manifest V3架构支持
- 响应式UI设计

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 开发环境

1. 克隆项目到本地
2. 在Chrome中加载为未打包扩展
3. 修改代码后重新加载扩展

### 提交规范

- 使用清晰的提交信息
- 遵循项目的代码风格
- 确保功能正常工作

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- 感谢飞书开放平台提供的API支持
- 感谢所有贡献者的努力

---

**如有问题或建议，请提交Issue或Pull Request。**