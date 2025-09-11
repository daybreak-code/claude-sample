// Background Service Worker
importScripts('common.js', 'record-manager.js');

class BackgroundService {
  constructor() {
    this.recordManager = new RecordManager();
    this.init();
  }

  init() {
    // 监听来自popup的消息
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // 保持消息通道开放
    });

    // 监听扩展安装事件
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstall(details);
    });

    console.log('Background Service Worker initialized');
  }

  // 处理消息
  async handleMessage(message, sender, sendResponse) {
    try {
      console.log('收到消息:', message);

      switch (message.type) {
        case MESSAGE_TYPES.SAVE_URL:
          await this.handleSaveUrl(message, sender, sendResponse);
          break;
        
        case MESSAGE_TYPES.UPDATE_URL:
          await this.handleUpdateUrl(message, sender, sendResponse);
          break;
        
        case MESSAGE_TYPES.CHECK_URL:
          await this.handleCheckUrl(message, sender, sendResponse);
          break;
        
        case MESSAGE_TYPES.TEST_CONNECTION:
          await this.handleTestConnection(message, sender, sendResponse);
          break;
        
        case MESSAGE_TYPES.GET_FIELDS:
          await this.handleGetFields(message, sender, sendResponse);
          break;
        
        default:
          console.warn('未知的消息类型:', message.type);
          sendResponse({ success: false, message: '未知的消息类型' });
      }
    } catch (error) {
      console.error('处理消息时发生错误:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理保存URL请求
  async handleSaveUrl(message, sender, sendResponse) {
    try {
      const { appId, appSecret, tableUrl, recordData } = message.data;
      
      // 验证配置
      Utils.validateConfig({ appId, appSecret, tableUrl });
      
      // 保存URL（包含存在性检查）
      const result = await this.recordManager.saveUrlWithCheck(
        appId, appSecret, tableUrl, recordData
      );
      
      sendResponse(result);
    } catch (error) {
      console.error('保存URL失败:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理更新URL请求
  async handleUpdateUrl(message, sender, sendResponse) {
    try {
      const { appId, appSecret, tableUrl, recordId, recordData } = message.data;
      
      // 验证配置
      Utils.validateConfig({ appId, appSecret, tableUrl });
      
      // 更新记录
      const result = await this.recordManager.updateUrlRecord(
        appId, appSecret, tableUrl, recordId, recordData
      );
      
      sendResponse(result);
    } catch (error) {
      console.error('更新URL失败:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理检查URL请求
  async handleCheckUrl(message, sender, sendResponse) {
    try {
      const { appId, appSecret, tableUrl, url } = message.data;
      
      // 验证配置
      Utils.validateConfig({ appId, appSecret, tableUrl });
      
      // 解析表格URL
      const { appToken, tableId, viewId } = Utils.parseTableUrl(tableUrl);
      
      // 获取访问令牌
      const accessToken = await this.recordManager.getAccessToken(appId, appSecret);
      
      // 如果没有指定表格ID，获取第一个表格
      let actualTableId = tableId;
      if (!actualTableId) {
        const tables = await this.recordManager.getTables(appToken, accessToken);
        if (tables.length > 0) {
          actualTableId = tables[0].table_token;
        }
      }
      
      if (!actualTableId) {
        throw new Error('没有找到可用的表格');
      }
      
      // 检查URL是否存在
      const checkResult = await this.recordManager.checkUrlExists(
        appToken, actualTableId, viewId, accessToken, url
      );
      
      sendResponse({
        success: true,
        exists: checkResult.exists,
        recordId: checkResult.recordId,
        existingData: checkResult.fields
      });
    } catch (error) {
      console.error('检查URL失败:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理测试连接请求
  async handleTestConnection(message, sender, sendResponse) {
    try {
      const { appId, appSecret, tableUrl } = message.data;
      
      // 验证配置
      Utils.validateConfig({ appId, appSecret, tableUrl });
      
      // 测试连接
      const result = await this.recordManager.testConnection(
        appId, appSecret, tableUrl
      );
      
      sendResponse(result);
    } catch (error) {
      console.error('测试连接失败:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理获取字段请求
  async handleGetFields(message, sender, sendResponse) {
    try {
      const { appId, appSecret, tableUrl } = message.data;
      
      // 验证配置
      Utils.validateConfig({ appId, appSecret, tableUrl });
      
      // 解析表格URL
      const { appToken, tableId, viewId } = Utils.parseTableUrl(tableUrl);
      
      // 获取访问令牌
      const accessToken = await this.recordManager.getAccessToken(appId, appSecret);
      
      // 如果没有指定表格ID，获取第一个表格
      let actualTableId = tableId;
      if (!actualTableId) {
        const tables = await this.recordManager.getTables(appToken, accessToken);
        if (tables.length > 0) {
          actualTableId = tables[0].table_token;
        }
      }
      
      if (!actualTableId) {
        throw new Error('没有找到可用的表格');
      }
      
      // 获取字段信息
      const fields = await this.recordManager.getFields(
        appToken, actualTableId, viewId, accessToken
      );
      
      sendResponse({
        success: true,
        fields: fields.map(field => ({
          name: field.field_name,
          type: field.type
        }))
      });
    } catch (error) {
      console.error('获取字段失败:', error);
      sendResponse({ 
        success: false, 
        message: Utils.getErrorMessage(error) 
      });
    }
  }

  // 处理扩展安装
  handleInstall(details) {
    if (details.reason === 'install') {
      console.log('扩展已安装');
      
      // 设置默认配置
      chrome.storage.sync.set({
        appId: '',
        appSecret: '',
        tableUrl: '',
        autoSave: false,
        createdAt: new Date().toISOString()
      });
      
      // 打开选项页面
      chrome.runtime.openOptionsPage();
    } else if (details.reason === 'update') {
      console.log('扩展已更新');
    }
  }

  // 获取当前标签页信息
  async getCurrentTabInfo() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        throw new Error('无法获取当前标签页');
      }
      
      return {
        url: tab.url,
        title: tab.title,
        favicon: tab.favIconUrl
      };
    } catch (error) {
      console.error('获取标签页信息失败:', error);
      throw error;
    }
  }

  // 提取网页信息
  async extractPageInfo(tabId) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId },
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
          
          return {
            description: description,
            keywords: keywords,
            h1Title: h1Title,
            pageTitle: document.title
          };
        }
      });
      
      return results[0]?.result || {};
    } catch (error) {
      console.error('提取页面信息失败:', error);
      return {};
    }
  }

  // 显示通知
  showNotification(title, message) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: title,
      message: message
    });
  }
}

// 创建后台服务实例
const backgroundService = new BackgroundService();

// 导出服务（用于测试）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackgroundService;
}