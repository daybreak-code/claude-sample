// 飞书记录管理器
class RecordManager {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = 0;
    this.cache = new Map();
  }

  // 获取访问令牌
  async getAccessToken(appId, appSecret) {
    // 检查缓存中的令牌是否有效
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_id: appId,
          app_secret: appSecret
        })
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`获取访问令牌失败: ${result.msg} (${result.code})`);
      }

      this.accessToken = result.data.tenant_access_token;
      this.tokenExpiry = Date.now() + (result.data.expire - 300) * 1000; // 提前5分钟过期
      
      console.log('成功获取访问令牌，过期时间:', new Date(this.tokenExpiry).toLocaleString());
      return this.accessToken;
    } catch (error) {
      console.error('获取访问令牌失败:', error);
      throw error;
    }
  }

  // 获取表格列表
  async getTables(appToken, accessToken) {
    try {
      const url = API_CONFIG.TABLES_ENDPOINT.replace('{appToken}', appToken);
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`获取表格列表失败: ${result.msg} (${result.code})`);
      }

      return result.data.items || [];
    } catch (error) {
      console.error('获取表格列表失败:', error);
      throw error;
    }
  }

  // 获取字段信息
  async getFields(appToken, tableId, viewId, accessToken) {
    try {
      let url = API_CONFIG.FIELDS_ENDPOINT
        .replace('{appToken}', appToken)
        .replace('{tableId}', tableId);
      
      if (viewId) {
        url += `?view_id=${viewId}`;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`获取字段信息失败: ${result.msg} (${result.code})`);
      }

      return result.data.items || [];
    } catch (error) {
      console.error('获取字段信息失败:', error);
      throw error;
    }
  }

  // 检查URL是否已存在
  async checkUrlExists(appToken, tableId, viewId, accessToken, url) {
    try {
      // 构建过滤器
      const filter = {
        filter: {
          conjunction: 'AND',
          conditions: [
            {
              field_name: FIELD_MAPPING.url,
              operator: 'is',
              value: [{
                text: url,
                link: url
              }]
            }
          ]
        }
      };

      let url = API_CONFIG.RECORDS_ENDPOINT
        .replace('{appToken}', appToken)
        .replace('{tableId}', tableId);
      
      if (viewId) {
        url += `?view_id=${viewId}`;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`检查URL存在性失败: ${result.msg} (${result.code})`);
      }

      const records = result.data.items || [];
      
      if (records.length > 0) {
        const record = records[0];
        return {
          exists: true,
          recordId: record.record_id,
          fields: record.fields
        };
      }

      return { exists: false };
    } catch (error) {
      console.error('检查URL存在性失败:', error);
      throw error;
    }
  }

  // 添加新记录
  async addRecord(appToken, tableId, viewId, accessToken, recordData) {
    try {
      const fields = this.formatFields(recordData);
      
      const payload = {
        fields: fields
      };

      let url = API_CONFIG.RECORDS_ENDPOINT
        .replace('{appToken}', appToken)
        .replace('{tableId}', tableId);
      
      if (viewId) {
        url += `?view_id=${viewId}`;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`添加记录失败: ${result.msg} (${result.code})`);
      }

      console.log('成功添加记录:', result.data);
      return result.data;
    } catch (error) {
      console.error('添加记录失败:', error);
      throw error;
    }
  }

  // 更新记录
  async updateRecord(appToken, tableId, viewId, accessToken, recordId, recordData) {
    try {
      const fields = this.formatFields(recordData);
      
      const payload = {
        fields: fields
      };

      let url = API_CONFIG.UPDATE_RECORD_ENDPOINT
        .replace('{appToken}', appToken)
        .replace('{tableId}', tableId)
        .replace('{recordId}', recordId);
      
      if (viewId) {
        url += `?view_id=${viewId}`;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`更新记录失败: ${result.msg} (${result.code})`);
      }

      console.log('成功更新记录:', result.data);
      return result.data;
    } catch (error) {
      console.error('更新记录失败:', error);
      throw error;
    }
  }

  // 格式化字段数据
  formatFields(recordData) {
    const fields = {};

    // 网站地址 - 超链接格式
    if (recordData.url) {
      fields[FIELD_MAPPING.url] = {
        text: recordData.url,
        link: recordData.url
      };
    }

    // 网站的中文说明 - 文本格式
    if (recordData.description) {
      fields[FIELD_MAPPING.description] = recordData.description;
    }

    // 网站的备注 - 多行文本格式
    if (recordData.notes) {
      fields[FIELD_MAPPING.notes] = recordData.notes;
    }

    // 网站的标签 - 单选格式
    if (recordData.tags) {
      fields[FIELD_MAPPING.tags] = recordData.tags;
    }

    // 创建时间 - 日期时间格式
    if (recordData.createTime) {
      fields[FIELD_MAPPING.createTime] = recordData.createTime;
    }

    return fields;
  }

  // 测试连接
  async testConnection(appId, appSecret, tableUrl) {
    try {
      // 解析表格URL
      const { appToken, tableId, viewId } = Utils.parseTableUrl(tableUrl);
      
      // 获取访问令牌
      const accessToken = await this.getAccessToken(appId, appSecret);
      
      // 获取表格列表
      const tables = await this.getTables(appToken, accessToken);
      
      // 如果没有指定表格ID，使用第一个表格
      let actualTableId = tableId;
      if (!actualTableId && tables.length > 0) {
        actualTableId = tables[0].table_token;
        console.log('使用第一个表格:', actualTableId);
      }
      
      if (!actualTableId) {
        throw new Error('没有找到可用的表格');
      }
      
      // 获取字段信息
      const fields = await this.getFields(appToken, actualTableId, viewId, accessToken);
      
      return {
        success: true,
        message: '连接测试成功',
        data: {
          appToken,
          tableId: actualTableId,
          viewId,
          fields: fields.map(field => ({
            name: field.field_name,
            type: field.type
          }))
        }
      };
    } catch (error) {
      console.error('连接测试失败:', error);
      return {
        success: false,
        message: Utils.getErrorMessage(error)
      };
    }
  }

  // 保存URL（包含存在性检查）
  async saveUrlWithCheck(appId, appSecret, tableUrl, recordData) {
    try {
      // 解析表格URL
      const { appToken, tableId, viewId } = Utils.parseTableUrl(tableUrl);
      
      // 获取访问令牌
      const accessToken = await this.getAccessToken(appId, appSecret);
      
      // 如果没有指定表格ID，获取第一个表格
      let actualTableId = tableId;
      if (!actualTableId) {
        const tables = await this.getTables(appToken, accessToken);
        if (tables.length > 0) {
          actualTableId = tables[0].table_token;
          console.log('使用第一个表格:', actualTableId);
        }
      }
      
      if (!actualTableId) {
        throw new Error('没有找到可用的表格');
      }
      
      // 检查URL是否已存在
      const checkResult = await this.checkUrlExists(appToken, actualTableId, viewId, accessToken, recordData.url);
      
      if (checkResult.exists) {
        return {
          success: true,
          exists: true,
          recordId: checkResult.recordId,
          existingData: checkResult.fields,
          message: 'URL已存在'
        };
      }
      
      // 添加新记录
      const result = await this.addRecord(appToken, actualTableId, viewId, accessToken, recordData);
      
      return {
        success: true,
        exists: false,
        recordId: result.record_id,
        message: '保存成功'
      };
    } catch (error) {
      console.error('保存URL失败:', error);
      return {
        success: false,
        message: Utils.getErrorMessage(error)
      };
    }
  }

  // 更新URL记录
  async updateUrlRecord(appId, appSecret, tableUrl, recordId, recordData) {
    try {
      // 解析表格URL
      const { appToken, tableId, viewId } = Utils.parseTableUrl(tableUrl);
      
      // 获取访问令牌
      const accessToken = await this.getAccessToken(appId, appSecret);
      
      // 如果没有指定表格ID，获取第一个表格
      let actualTableId = tableId;
      if (!actualTableId) {
        const tables = await this.getTables(appToken, accessToken);
        if (tables.length > 0) {
          actualTableId = tables[0].table_token;
        }
      }
      
      if (!actualTableId) {
        throw new Error('没有找到可用的表格');
      }
      
      // 更新记录
      const result = await this.updateRecord(appToken, actualTableId, viewId, accessToken, recordId, recordData);
      
      return {
        success: true,
        recordId: result.record_id,
        message: '更新成功'
      };
    } catch (error) {
      console.error('更新URL记录失败:', error);
      return {
        success: false,
        message: Utils.getErrorMessage(error)
      };
    }
  }
}

// 创建全局实例
const recordManager = new RecordManager();

// 导出记录管理器
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RecordManager;
} else {
  window.RecordManager = RecordManager;
  window.recordManager = recordManager;
}