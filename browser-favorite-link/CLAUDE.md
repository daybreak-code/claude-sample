# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个Chrome浏览器扩展，用于将网页URL快速保存到飞书多维表格。扩展使用Manifest V3规范，通过飞书开放API与多维表格交互。

## 架构说明

### 核心组件
- **background.js**: Service Worker，处理所有飞书API调用，包括获取访问令牌和添加记录到多维表格
- **popup.html/js**: 用户交互界面，收集网页信息和用户输入
- **options.html/js**: 配置页面，用于设置飞书应用凭据和表格URL

### 数据流
1. 用户在popup中填写信息并点击保存
2. popup.js发送消息到background.js
3. background.js调用飞书API获取访问令牌
4. 使用令牌将数据写入指定的多维表格

### 飞书API集成
- 使用tenant_access_token内部应用认证方式
- API基础URL: `https://open.feishu.cn/open-apis`
- 主要接口：
  - `/auth/v3/tenant_access_token/internal` - 获取访问令牌
  - `/bitable/v1/apps/{appToken}/tables` - 获取表格列表
  - `/bitable/v1/apps/{appToken}/tables/{tableId}/fields?view_id={viewId}` - 获取字段信息
  - `/bitable/v1/apps/{appToken}/tables/{tableId}/records` - 添加记录
  - `/bitable/v1/apps/{appToken}/tables/{tableId}/fields/{fieldId}?view_id={viewId}` - 更新字段选项

### 重要更新（API调用修复）
- 飞书多维表格需要区分app token、table ID和view ID
- 用户现在需要输入完整的表格URL（如：https://xxx.feishu.cn/base/B3cibQKgVaqBcTsxj10cMoSMnXS?table=tblRlS0ozOVJTcKR&view=vewkJwjXGm）
- background.js中的`parseTableUrl`函数会解析URL提取app token、table ID和view ID
- view ID用于获取字段信息时的正确配置
- 如果URL中没有table参数，会自动获取第一个表格

### 权限配置要点
1. **应用权限**：必须添加"查看、评论、编辑和管理多维表格"权限
2. **应用发布**：自建应用需要发布到企业内才能使用
3. **表格权限**：必须将多维表格分享给应用，并设置"可编辑"权限

### 错误代码处理
- **91402 (NOTEXIST)**：表格不存在或无权限访问
- **91403 (Forbidden)**：权限不足，需要检查应用权限和表格分享设置
- **1254043**：字段名称不匹配
- **1254060 (TextFieldConvFail)**：文本字段转换失败
- **1254061 (HyperlinkFieldConvFail)**：超链接字段转换失败
- **1254062 (SingleSelectFieldConvFail)**：单选字段转换失败
- **1254064 (DatetimeFieldConvFail)**：日期时间字段转换失败

### 存储结构
使用Chrome Storage API存储配置：
- appId: 飞书应用ID
- appSecret: 飞书应用密钥
- tableUrl: 多维表格完整URL（替代原来的tableId）

### 多维表格字段映射
- 网站地址 → URL（超链接格式：{text: url, link: url}）
- 网站的中文说明 → 用户输入的描述（文本格式）
- 网站的备注 → 用户输入的备注（多行文本格式）
- 网站的标签 → 用户输入的标签（单选格式：直接使用选项名称字符串）
- 创建时间 → 时间戳（日期时间格式）

**注意**: 所有字段名称与多维表格中的实际字段名称保持完全一致。

## 开发说明

### 调试扩展
1. 在Chrome中打开 `chrome://extensions/`
2. 开启开发者模式
3. 点击"加载已解压的扩展程序"选择项目目录
4. 使用Chrome开发者工具调试：
   - Service Worker: 在扩展管理页面点击"检查视图"下的"Service Worker"
   - Popup: 右键点击扩展图标选择"检查弹出式窗口"

### 测试API连接
options.js中包含测试连接功能，会验证：
1. App ID和App Secret是否正确（能否获取访问令牌）
2. 表格URL是否有效（能否访问表格）

### 调试日志
background.js中添加了详细的日志输出，包括：
- App ID和Token信息
- URL解析结果
- API请求和响应
- 错误详情

### 新功能：URL唯一性检查和覆盖更新 (2024-06-16)

#### 功能概述
实现了"网站地址"作为唯一键的功能，在保存URL前会检查是否已存在相同的网址：
- 如果URL不存在，直接保存
- 如果URL已存在，显示确认对话框让用户选择：
  - 覆盖更新现有记录
  - 取消操作

#### 实现细节

**后端API扩展：**
- `record-manager.js`：增加了`updateUrlRecord`方法用于更新现有记录
- `record-manager.js`：改进了`checkUrlExists`方法，返回更详细的记录信息
- `background-new.js`：增加了`handleUpdateUrl`方法处理UPDATE_URL消息
- `common.js`：增加了`UPDATE_URL`消息类型

**前端UI改进：**
- `popup-new.html`：增加了确认对话框HTML结构
- `popup-new.css`：增加了确认对话框样式（包含暗色模式支持）
- `popup-new.js`：增加了URL存在性检查逻辑和确认对话框处理

**用户体验：**
- 在确认对话框中显示现有记录的详细信息（网站地址、网站的中文说明、网站的备注、网站的标签、创建时间）
- 提供清晰的"覆盖更新"和"取消"按钮
- 保持与原有UI风格一致的设计
- 所有字段名称与多维表格中的实际字段名称完全一致

#### 测试建议
1. 尝试保存一个新的URL，应该直接保存成功
2. 尝试保存相同的URL，应该弹出确认对话框
3. 在确认对话框中选择"覆盖更新"，应该更新现有记录
4. 在确认对话框中选择"取消"，应该返回编辑页面
5. 确认对话框应该显示现有记录的完整信息

### 注意事项
- Manifest V3中background script改为service worker，不能使用持久连接
- 所有飞书API调用都需要在manifest.json的host_permissions中声明
- 异步消息响应需要返回true以保持消息通道开放
- 确保Authorization header格式正确：`Bearer ${accessToken}`
- URL检查使用"网站地址"字段名进行查询，确保与表格字段名称一致