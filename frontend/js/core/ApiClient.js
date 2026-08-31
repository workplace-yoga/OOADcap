/**
 * Base ApiClient with automatic Environment-Aware Base URL resolution,
 * JWT token attachment, and unified error interception.
 */
class ApiClient {
  constructor(baseUrl = null) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    } else if (window.API_BASE_URL) {
      this.baseUrl = window.API_BASE_URL;
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
      this.baseUrl = 'http://localhost:5000/api/v1';
    } else {
      // Production Render Backend URL
      this.baseUrl = 'https://ooadcap.onrender.com/api/v1';
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('sis_token');

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const config = {
      ...options,
      headers
    };

    try {
      const res = await fetch(url, config);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 && !endpoint.includes('/auth/login')) {
          localStorage.removeItem('sis_token');
          localStorage.removeItem('sis_user');
          window.location.hash = '#/login';
        }
        throw new Error(data.message || `HTTP ${res.status} Error`);
      }
      return data;
    } catch (err) {
      console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
      throw err;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
