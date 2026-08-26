import { api } from '../core/ApiClient.js';
import { state } from '../core/StateManager.js';

class AuthService {
  async login(username, password) {
    const res = await api.post('/auth/login', { username, password });
    if (res.success && res.data) {
      state.setUser(res.data.user, res.data.token);
    }
    return res;
  }

  async getProfile() {
    return await api.get('/auth/profile');
  }

  logout() {
    state.clearUser();
    window.location.hash = '#/login';
  }
}

export const authService = new AuthService();
