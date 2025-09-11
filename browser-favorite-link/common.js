// 消息类型常量
const MESSAGE_TYPES = {
  SAVE_URL: 'SAVE_URL',
  UPDATE_URL: 'UPDATE_URL',
  CHECK_URL: 'CHECK_URL',
  TEST_CONNECTION: 'TEST_CONNECTION',
  GET_FIELDS: 'GET_FIELDS',
  SAVE_RESPONSE: 'SAVE_RESPONSE',
  ERROR_RESPONSE: 'ERROR_RESPONSE'
};

// API配置
const API_CONFIG = {
  BASE_URL: 'https://open.feishu.cn/open-apis',
  AUTH_ENDPOINT: '/auth/v3/tenant_access_token/internal',
  TABLES_ENDPOINT: '/bitable/v1/apps/{appToken}/tables',
  FIELDS_ENDPOINT: '/bitable/v1/apps/{appToken}/tables/{tableId}/fields',
  RECORDS_ENDPOINT: '/bitable/v1/apps/{appToken}/tables/{tableId}/records',
  UPDATE_RECORD_ENDPOINT: '/bitable/v1/apps/{appToken}/tables/{tableId}/records/{recordId}'
};

// 字段映射配置
const FIELD_MAPPING = {
  url: '网站地址',
  description: '网站的中文说明',
  notes: '网站的备注',
  tags: '网站的标签',
  createTime: '创建时间'
};

// 错误代码处理
const ERROR_CODES = {
  91402: { message: '表格不存在或无权限访问', action: '检查表格URL和权限设置' },
  91403: { message: '权限不足', action: '检查应用权限和表格分享设置' },
  1254043: { message: '字段名称不匹配', action: '检查字段名称是否正确' },
  1254060: { message: '文本字段转换失败', action: '检查文本字段格式' },
  1254061: { message: '超链接字段转换失败', action: '检查URL字段格式' },
  1254062: { message: '单选字段转换失败', action: '检查单选字段格式' },
  1254064: { message: '日期时间字段转换失败', action: '检查日期时间字段格式' }
};

// 工具函数
const Utils = {
  // 解析飞书表格URL
  parseTableUrl: function(url) {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const appToken = pathParts[pathParts.length - 1];
      
      let tableId = null;
      let viewId = null;
      
      // 解析查询参数
      const urlParams = new URLSearchParams(urlObj.search);
      tableId = urlParams.get('table');
      viewId = urlParams.get('view');
      
      if (!tableId) {
        console.log('URL中没有table参数，将使用第一个表格');
      }
      
      console.log('URL解析结果:', { appToken, tableId, viewId });
      return { appToken, tableId, viewId };
    } catch (error) {
      console.error('解析表格URL失败:', error);
      throw new Error('无效的表格URL格式');
    }
  },

  // 格式化日期时间
  formatDateTime: function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  // 获取错误信息
  getErrorMessage: function(error) {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error.code && ERROR_CODES[error.code]) {
      const errorInfo = ERROR_CODES[error.code];
      return `${errorInfo.message} (${error.code}) - ${errorInfo.action}`;
    }
    
    return error.message || '未知错误';
  },

  // 验证配置
  validateConfig: function(config) {
    if (!config.appId || !config.appSecret) {
      throw new Error('请先配置飞书应用的App ID和App Secret');
    }
    
    if (!config.tableUrl) {
      throw new Error('请先配置飞书多维表格URL');
    }
    
    return true;
  },

  // 深拷贝对象
  deepClone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // 防抖函数
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 节流函数
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// 消息发送工具
const MessageSender = {
  // 发送消息到background
  sendToBackground: function(type, data) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type, data }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  },

  // 发送错误响应
  sendError: function(sender, error) {
    const errorMessage = Utils.getErrorMessage(error);
    sender.postMessage({
      type: MESSAGE_TYPES.ERROR_RESPONSE,
      error: errorMessage
    });
  },

  // 发送成功响应
  sendSuccess: function(sender, data) {
    sender.postMessage({
      type: MESSAGE_TYPES.SAVE_RESPONSE,
      data: data
    });
  }
};

// 导出常量和工具函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MESSAGE_TYPES,
    API_CONFIG,
    FIELD_MAPPING,
    ERROR_CODES,
    Utils,
    MessageSender
  };
}