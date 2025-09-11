// Options页面交互逻辑
class OptionsManager {
  constructor() {
    this.recordManager = new RecordManager();
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSettings();
  }

  // 绑定事件
  bindEvents() {
    // 保存配置
    document.getElementById('saveConfigBtn').addEventListener('click', () => {
      this.saveConfig();
    });

    // 测试连接
    document.getElementById('testConnectionBtn').addEventListener('click', () => {
      this.testConnection();
    });

    // 导出设置
    document.getElementById('exportSettingsBtn').addEventListener('click', () => {
      this.exportSettings();
    });

    // 导入设置
    document.getElementById('importSettingsBtn').addEventListener('click', () => {
      this.importSettings();
    });

    // 重置设置
    document.getElementById('resetSettingsBtn').addEventListener('click', () => {
      this.resetSettings();
    });

    // 帮助链接
    document.getElementById('helpLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showHelp();
    });

    // 表单输入验证
    document.getElementById('appId').addEventListener('input', () => {
      this.validateForm();
    });

    document.getElementById('appSecret').addEventListener('input', () => {
      this.validateForm();
    });

    document.getElementById('tableUrl').addEventListener('input', () => {
      this.validateForm();
    });

    // 文件导入
    document.getElementById('importFileInput').addEventListener('change', (e) => {
      this.handleFileImport(e);
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            this.saveConfig();
            break;
          case 't':
            e.preventDefault();
            this.testConnection();
            break;
        }
      }
    });
  }

  // 加载设置
  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get([
        'appId', 'appSecret', 'tableUrl', 'defaultTags', 
        'autoSave', 'autoCopy', 'debugMode'
      ]);

      // 填充表单
      document.getElementById('appId').value = result.appId || '';
      document.getElementById('appSecret').value = result.appSecret || '';
      document.getElementById('tableUrl').value = result.tableUrl || '';
      document.getElementById('defaultTags').value = result.defaultTags || '';
      document.getElementById('autoSave').checked = result.autoSave || false;
      document.getElementById('autoCopy').checked = result.autoCopy || false;
      document.getElementById('debugMode').checked = result.debugMode || false;

      // 验证表单
      this.validateForm();

      // 如果有配置，显示连接状态
      if (result.appId && result.appSecret && result.tableUrl) {
        this.showConnectionStatus();
      }
    } catch (error) {
      console.error('加载设置失败:', error);
      this.showError('加载设置失败: ' + error.message);
    }
  }

  // 保存配置
  async saveConfig() {
    if (!this.validateForm()) {
      return;
    }

    const saveBtn = document.getElementById('saveConfigBtn');
    const originalText = saveBtn.innerHTML;
    
    // 显示保存状态
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>保存中...</span>';

    try {
      const config = {
        appId: document.getElementById('appId').value.trim(),
        appSecret: document.getElementById('appSecret').value.trim(),
        tableUrl: document.getElementById('tableUrl').value.trim(),
        defaultTags: document.getElementById('defaultTags').value,
        autoSave: document.getElementById('autoSave').checked,
        autoCopy: document.getElementById('autoCopy').checked,
        debugMode: document.getElementById('debugMode').checked,
        updatedAt: new Date().toISOString()
      };

      // 保存到chrome.storage
      await chrome.storage.sync.set(config);

      // 显示成功消息
      this.showSuccess('配置保存成功！');

      // 测试连接
      setTimeout(() => {
        this.testConnection();
      }, 1000);

    } catch (error) {
      console.error('保存配置失败:', error);
      this.showError('保存配置失败: ' + error.message);
    } finally {
      // 恢复按钮状态
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalText;
    }
  }

  // 验证表单
  validateForm() {
    const appId = document.getElementById('appId').value.trim();
    const appSecret = document.getElementById('appSecret').value.trim();
    const tableUrl = document.getElementById('tableUrl').value.trim();
    const saveBtn = document.getElementById('saveConfigBtn');

    const isValid = appId && appSecret && tableUrl;
    saveBtn.disabled = !isValid;

    return isValid;
  }

  // 测试连接
  async testConnection() {
    if (!this.validateForm()) {
      this.showError('请先填写完整的配置信息');
      return;
    }

    const testBtn = document.getElementById('testConnectionBtn');
    const originalText = testBtn.innerHTML;
    
    // 显示测试状态
    testBtn.disabled = true;
    testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>测试中...</span>';

    try {
      const config = {
        appId: document.getElementById('appId').value.trim(),
        appSecret: document.getElementById('appSecret').value.trim(),
        tableUrl: document.getElementById('tableUrl').value.trim()
      };

      // 测试连接
      const result = await this.recordManager.testConnection(
        config.appId, config.appSecret, config.tableUrl
      );

      if (result.success) {
        this.showConnectionStatus(result.data);
        this.showSuccess('连接测试成功！');
      } else {
        this.showConnectionStatus(null, result.message);
        this.showError('连接测试失败: ' + result.message);
      }

    } catch (error) {
      console.error('测试连接失败:', error);
      const errorMessage = Utils.getErrorMessage(error);
      this.showConnectionStatus(null, errorMessage);
      this.showError('连接测试失败: ' + errorMessage);
    } finally {
      // 恢复按钮状态
      testBtn.disabled = false;
      testBtn.innerHTML = originalText;
    }
  }

  // 显示连接状态
  showConnectionStatus(data, error) {
    const statusSection = document.getElementById('connectionStatus');
    const connectionContent = document.getElementById('connectionContent');

    statusSection.style.display = 'block';

    if (error) {
      connectionContent.innerHTML = `
        <div class="status-item status-error">
          <i class="fas fa-exclamation-triangle"></i>
          <div class="status-content">
            <div class="status-title">连接失败</div>
            <div class="status-message">${error}</div>
          </div>
        </div>
      `;
    } else if (data) {
      connectionContent.innerHTML = `
        <div class="status-item status-success">
          <i class="fas fa-check-circle"></i>
          <div class="status-content">
            <div class="status-title">连接成功</div>
            <div class="status-message">应用配置正确，可以正常访问飞书API</div>
            <div class="status-details">
              <div class="detail-item">
                <span class="detail-label">应用Token:</span>
                <span class="detail-value">${data.appToken}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">表格ID:</span>
                <span class="detail-value">${data.tableId}</span>
              </div>
              ${data.viewId ? `
                <div class="detail-item">
                  <span class="detail-label">视图ID:</span>
                  <span class="detail-value">${data.viewId}</span>
                </div>
              ` : ''}
              <div class="detail-item">
                <span class="detail-label">字段数量:</span>
                <span class="detail-value">${data.fields.length}</span>
              </div>
            </div>
            <div class="field-list">
              <div class="field-title">检测到的字段:</div>
              ${data.fields.map(field => `
                <div class="field-item">
                  <span class="field-name">${field.name}</span>
                  <span class="field-type">${this.getFieldTypeText(field.type)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      statusSection.style.display = 'none';
    }
  }

  // 获取字段类型文本
  getFieldTypeText(type) {
    const typeMap = {
      'text': '文本',
      'longText': '多行文本',
      'singleSelect': '单选',
      'multiSelect': '多选',
      'datetime': '日期时间',
      'number': '数字',
      'url': '超链接',
      'attachment': '附件',
      'user': '人员',
      'checkbox': '复选框',
      'currency': '货币',
      'percent': '百分比',
      'rating': '评分',
      'formula': '公式',
      'lookup': '查找引用',
      'rollup': '汇总',
      'location': '位置',
      'phone': '电话',
      'email': '邮箱'
    };
    return typeMap[type] || type;
  }

  // 导出设置
  exportSettings() {
    try {
      const settings = {
        version: '1.0.0',
        exportTime: new Date().toISOString(),
        settings: {
          appId: document.getElementById('appId').value.trim(),
          defaultTags: document.getElementById('defaultTags').value,
          autoSave: document.getElementById('autoSave').checked,
          autoCopy: document.getElementById('autoCopy').checked,
          debugMode: document.getElementById('debugMode').checked
        }
        // 注意：不导出敏感信息如appSecret和tableUrl
      };

      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `feishu-bookmark-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
      
      this.showSuccess('设置导出成功！');
    } catch (error) {
      console.error('导出设置失败:', error);
      this.showError('导出设置失败: ' + error.message);
    }
  }

  // 导入设置
  importSettings() {
    document.getElementById('importFileInput').click();
  }

  // 处理文件导入
  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // 验证文件格式
        if (!data.version || !data.settings) {
          throw new Error('无效的设置文件格式');
        }

        // 导入设置（跳过敏感信息）
        const { defaultTags, autoSave, autoCopy, debugMode } = data.settings;
        
        if (defaultTags !== undefined) {
          document.getElementById('defaultTags').value = defaultTags;
        }
        if (autoSave !== undefined) {
          document.getElementById('autoSave').checked = autoSave;
        }
        if (autoCopy !== undefined) {
          document.getElementById('autoCopy').checked = autoCopy;
        }
        if (debugMode !== undefined) {
          document.getElementById('debugMode').checked = debugMode;
        }

        this.showSuccess('设置导入成功！请手动填写App ID、App Secret和表格URL');
        
      } catch (error) {
        console.error('导入设置失败:', error);
        this.showError('导入设置失败: ' + error.message);
      }
    };

    reader.readAsText(file);
    
    // 清空文件输入
    event.target.value = '';
  }

  // 重置设置
  resetSettings() {
    if (confirm('确定要重置所有设置吗？此操作不可撤销。')) {
      chrome.storage.sync.clear(() => {
        // 清空表单
        document.getElementById('appId').value = '';
        document.getElementById('appSecret').value = '';
        document.getElementById('tableUrl').value = '';
        document.getElementById('defaultTags').value = '';
        document.getElementById('autoSave').checked = false;
        document.getElementById('autoCopy').checked = false;
        document.getElementById('debugMode').checked = false;
        
        // 隐藏连接状态
        document.getElementById('connectionStatus').style.display = 'none';
        
        this.showSuccess('设置已重置');
      });
    }
  }

  // 显示帮助
  showHelp() {
    const helpContent = `
      <div class="help-modal">
        <div class="help-header">
          <h3>使用帮助</h3>
          <button class="help-close" onclick="this.closest('.help-modal').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="help-body">
          <div class="help-section">
            <h4>快捷键</h4>
            <ul>
              <li><strong>Ctrl+S</strong> - 保存配置</li>
              <li><strong>Ctrl+T</strong> - 测试连接</li>
            </ul>
          </div>
          <div class="help-section">
            <h4>常见问题</h4>
            <ul>
              <li><strong>获取App ID和App Secret：</strong>访问飞书开放平台，创建自建应用后获取</li>
              <li><strong>权限配置：</strong>确保应用有"查看、评论、编辑和管理多维表格"权限</li>
              <li><strong>表格分享：</strong>将多维表格分享给应用，并设置"可编辑"权限</li>
              <li><strong>URL格式：</strong>使用完整的表格URL，包含table和view参数</li>
            </ul>
          </div>
          <div class="help-section">
            <h4>错误代码</h4>
            <ul>
              <li><strong>91402</strong> - 表格不存在或无权限访问</li>
              <li><strong>91403</strong> - 权限不足</li>
              <li><strong>1254043</strong> - 字段名称不匹配</li>
              <li><strong>1254060-1254064</strong> - 字段转换失败</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    const helpDiv = document.createElement('div');
    helpDiv.innerHTML = helpContent;
    helpDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(helpDiv);

    // 点击背景关闭
    helpDiv.addEventListener('click', (e) => {
      if (e.target === helpDiv) {
        helpDiv.remove();
      }
    });
  }

  // 显示成功消息
  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  // 显示错误消息
  showError(message) {
    this.showMessage(message, 'error');
  }

  // 显示消息
  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;
    
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 200px;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.parentNode.removeChild(messageDiv);
        }
      }, 300);
    }, 3000);
  }
}

// 初始化选项管理器
document.addEventListener('DOMContentLoaded', () => {
  const optionsManager = new OptionsManager();
});