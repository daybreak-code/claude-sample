// Popup 交互逻辑
class PopupManager {
  constructor() {
    this.currentTab = null;
    this.currentPageInfo = {};
    this.pendingUpdate = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadCurrentPage();
    this.checkConfig();
    this.loadSettings();
  }

  // 绑定事件
  bindEvents() {
    // 配置按钮
    document.getElementById('configBtn').addEventListener('click', () => {
      this.openOptionsPage();
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.openOptionsPage();
    });

    // 复制URL按钮
    document.getElementById('copyUrlBtn').addEventListener('click', () => {
      this.copyUrl();
    });

    // 自动提取按钮
    document.getElementById('autoExtractBtn').addEventListener('click', () => {
      this.autoExtractInfo();
    });

    // 保存按钮
    document.getElementById('saveBtn').addEventListener('click', () => {
      this.saveToFeishu();
    });

    // 重试按钮
    document.getElementById('retryBtn').addEventListener('click', () => {
      this.retrySave();
    });

    // 新保存按钮
    document.getElementById('newSaveBtn').addEventListener('click', () => {
      this.resetForm();
    });

    // 确认对话框按钮
    document.getElementById('confirmUpdateBtn').addEventListener('click', () => {
      this.confirmUpdate();
    });

    document.getElementById('cancelUpdateBtn').addEventListener('click', () => {
      this.closeConfirmDialog();
    });

    // 表单验证
    document.getElementById('description').addEventListener('input', () => {
      this.validateForm();
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            if (this.isFormValid()) {
              this.saveToFeishu();
            }
            break;
          case 'e':
            e.preventDefault();
            this.autoExtractInfo();
            break;
        }
      }
    });
  }

  // 加载当前页面信息
  async loadCurrentPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        this.showError('无法获取当前页面信息');
        return;
      }

      this.currentTab = tab;

      // 设置URL和标题
      document.getElementById('url').value = tab.url || '';
      document.getElementById('title').value = tab.title || '';

      // 提取页面信息
      await this.extractPageInfo(tab);
    } catch (error) {
      console.error('加载页面信息失败:', error);
      this.showError('加载页面信息失败');
    }
  }

  // 提取页面信息
  async extractPageInfo(tab) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // 提取页面描述
          let description = '';
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            description = metaDesc.getAttribute('content') || '';
          }

          // 提取页面关键词
          let keywords = '';
          const metaKeywords = document.querySelector('meta[name="keywords"]');
          if (metaKeywords) {
            keywords = metaKeywords.getAttribute('content') || '';
          }

          // 提取h1标题
          let h1Title = '';
          const h1 = document.querySelector('h1');
          if (h1) {
            h1Title = h1.textContent.trim();
          }

          // 提取页面文本摘要
          let textSummary = '';
          const paragraphs = document.querySelectorAll('p');
          if (paragraphs.length > 0) {
            const firstP = paragraphs[0].textContent.trim();
            if (firstP.length > 100) {
              textSummary = firstP.substring(0, 100) + '...';
            } else {
              textSummary = firstP;
            }
          }

          return {
            description: description,
            keywords: keywords,
            h1Title: h1Title,
            textSummary: textSummary,
            pageTitle: document.title
          };
        }
      });

      this.currentPageInfo = results[0]?.result || {};
    } catch (error) {
      console.error('提取页面信息失败:', error);
    }
  }

  // 检查配置
  async checkConfig() {
    try {
      const result = await chrome.storage.sync.get(['appId', 'appSecret', 'tableUrl']);
      const { appId, appSecret, tableUrl } = result;

      const hasConfig = appId && appSecret && tableUrl;
      
      // 显示或隐藏配置提示
      const configAlert = document.getElementById('configAlert');
      const mainForm = document.getElementById('mainForm');
      
      if (hasConfig) {
        configAlert.style.display = 'none';
        mainForm.style.display = 'block';
      } else {
        configAlert.style.display = 'block';
        mainForm.style.display = 'none';
      }
    } catch (error) {
      console.error('检查配置失败:', error);
    }
  }

  // 加载设置
  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['autoSave', 'defaultTags']);
      const { autoSave, defaultTags } = result;

      // 设置默认标签
      if (defaultTags) {
        document.getElementById('tags').value = defaultTags;
      }
    } catch (error) {
      console.error('加载设置失败:', error);
    }
  }

  // 自动提取信息
  autoExtractInfo() {
    const { description, h1Title, textSummary, keywords } = this.currentPageInfo;
    
    let extractedText = '';
    
    // 优先使用描述
    if (description) {
      extractedText = description;
    }
    // 其次使用h1标题
    else if (h1Title && h1Title !== this.currentTab?.title) {
      extractedText = h1Title;
    }
    // 最后使用文本摘要
    else if (textSummary) {
      extractedText = textSummary;
    }

    // 填充描述字段
    const descField = document.getElementById('description');
    if (extractedText && !descField.value) {
      descField.value = extractedText;
    }

    // 智能标签建议
    if (keywords) {
      const keywordArray = keywords.split(',').map(k => k.trim());
      const suggestTag = this.suggestTagFromKeywords(keywordArray);
      if (suggestTag) {
        document.getElementById('tags').value = suggestTag;
      }
    }

    // 验证表单
    this.validateForm();

    // 显示提取成功提示
    this.showTempMessage('信息提取成功！', 'success');
  }

  // 根据关键词建议标签
  suggestTagFromKeywords(keywords) {
    const keywordTagMap = {
      '技术': '工具',
      '开发': '工具',
      '设计': '工具',
      '新闻': '新闻',
      '资讯': '新闻',
      '学习': '学习',
      '教育': '学习',
      '购物': '购物',
      '商品': '购物',
      '娱乐': '娱乐',
      '游戏': '娱乐',
      '视频': '娱乐',
      '音乐': '娱乐',
      '工作': '工作',
      '办公': '工作',
      '社交': '社交',
      '交友': '社交',
      '工具': '工具',
      '软件': '工具'
    };

    for (const keyword of keywords) {
      for (const [key, tag] of Object.entries(keywordTagMap)) {
        if (keyword.includes(key)) {
          return tag;
        }
      }
    }

    return '';
  }

  // 验证表单
  validateForm() {
    const description = document.getElementById('description').value.trim();
    const saveBtn = document.getElementById('saveBtn');
    
    if (description) {
      saveBtn.disabled = false;
    } else {
      saveBtn.disabled = true;
    }
  }

  // 检查表单是否有效
  isFormValid() {
    const description = document.getElementById('description').value.trim();
    return !!description;
  }

  // 保存到飞书
  async saveToFeishu() {
    if (!this.isFormValid()) {
      this.showError('请填写网站说明');
      return;
    }

    this.showLoading();

    try {
      // 获取配置
      const result = await chrome.storage.sync.get(['appId', 'appSecret', 'tableUrl']);
      const { appId, appSecret, tableUrl } = result;

      // 准备数据
      const recordData = {
        url: this.currentTab.url,
        description: document.getElementById('description').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        tags: document.getElementById('tags').value,
        createTime: Utils.formatDateTime(new Date())
      };

      // 发送保存请求
      const response = await MessageSender.sendToBackground(MESSAGE_TYPES.SAVE_URL, {
        appId,
        appSecret,
        tableUrl,
        recordData
      });

      if (response.success) {
        if (response.exists) {
          // URL已存在，显示确认对话框
          this.pendingUpdate = {
            recordId: response.recordId,
            recordData: recordData,
            existingData: response.existingData
          };
          this.showConfirmDialog(response.existingData);
        } else {
          // 保存成功
          this.showSuccess();
        }
      } else {
        this.showError(response.message);
      }
    } catch (error) {
      console.error('保存失败:', error);
      this.showError(Utils.getErrorMessage(error));
    }
  }

  // 确认更新
  async confirmUpdate() {
    if (!this.pendingUpdate) return;

    this.showLoading();
    this.closeConfirmDialog();

    try {
      const { appId, appSecret, tableUrl } = await chrome.storage.sync.get(['appId', 'appSecret', 'tableUrl']);
      
      const response = await MessageSender.sendToBackground(MESSAGE_TYPES.UPDATE_URL, {
        appId,
        appSecret,
        tableUrl,
        recordId: this.pendingUpdate.recordId,
        recordData: this.pendingUpdate.recordData
      });

      if (response.success) {
        this.showSuccess('更新成功！');
      } else {
        this.showError(response.message);
      }
    } catch (error) {
      console.error('更新失败:', error);
      this.showError(Utils.getErrorMessage(error));
    }

    this.pendingUpdate = null;
  }

  // 显示确认对话框
  showConfirmDialog(existingData) {
    const dialog = document.getElementById('confirmDialog');
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    // 填充现有数据
    document.getElementById('existingUrl').textContent = existingData[FIELD_MAPPING.url]?.link || '';
    document.getElementById('existingDescription').textContent = existingData[FIELD_MAPPING.description] || '';
    document.getElementById('existingNotes').textContent = existingData[FIELD_MAPPING.notes] || '';
    document.getElementById('existingTags').textContent = existingData[FIELD_MAPPING.tags] || '';
    document.getElementById('existingTime').textContent = existingData[FIELD_MAPPING.createTime] || '';

    dialog.style.display = 'block';
    overlay.style.display = 'block';
  }

  // 关闭确认对话框
  closeConfirmDialog() {
    const dialog = document.getElementById('confirmDialog');
    const overlay = document.querySelector('.modal-overlay');
    
    if (overlay) {
      overlay.remove();
    }
    
    dialog.style.display = 'none';
    this.hideLoading();
  }

  // 复制URL
  async copyUrl() {
    const url = document.getElementById('url').value;
    
    try {
      await navigator.clipboard.writeText(url);
      this.showTempMessage('URL已复制到剪贴板', 'success');
    } catch (error) {
      // 降级处理
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showTempMessage('URL已复制到剪贴板', 'success');
    }
  }

  // 显示加载状态
  showLoading() {
    document.getElementById('mainForm').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('successState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
  }

  // 隐藏加载状态
  hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('mainForm').style.display = 'block';
  }

  // 显示成功状态
  showSuccess(message = '保存成功！') {
    document.getElementById('mainForm').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'block';
    document.getElementById('errorState').style.display = 'none';
    
    // 更新成功消息
    document.querySelector('.success-text').textContent = message;
  }

  // 显示错误状态
  showError(message) {
    document.getElementById('mainForm').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
    
    // 更新错误消息
    document.querySelector('.error-text').textContent = message;
  }

  // 重试保存
  retrySave() {
    document.getElementById('mainForm').style.display = 'block';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
  }

  // 重置表单
  resetForm() {
    document.getElementById('description').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('tags').value = '';
    document.getElementById('saveBtn').disabled = true;
    
    document.getElementById('mainForm').style.display = 'block';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('successState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    
    // 重新加载页面信息
    this.loadCurrentPage();
  }

  // 显示临时消息
  showTempMessage(message, type = 'info') {
    const tempMessage = document.createElement('div');
    tempMessage.className = `temp-message temp-message-${type}`;
    tempMessage.textContent = message;
    tempMessage.style.cssText = `
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
    `;
    
    document.body.appendChild(tempMessage);
    
    setTimeout(() => {
      tempMessage.style.opacity = '0';
      tempMessage.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(tempMessage);
      }, 300);
    }, 2000);
  }

  // 打开选项页面
  openOptionsPage() {
    chrome.runtime.openOptionsPage();
    window.close();
  }
}

// 初始化Popup管理器
document.addEventListener('DOMContentLoaded', () => {
  const popupManager = new PopupManager();
  
  // 使函数全局可用
  window.closeConfirmDialog = () => {
    popupManager.closeConfirmDialog();
  };
});

// 全局函数（供HTML调用）
function closeConfirmDialog() {
  if (window.popupManager) {
    window.popupManager.closeConfirmDialog();
  }
}