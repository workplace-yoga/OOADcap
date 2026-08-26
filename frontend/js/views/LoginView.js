import { authService } from '../services/AuthService.js';
import { showToast } from '../core/StateManager.js';

export function renderLoginView() {
  return `
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
    <div class="glass-card" style="width: 100%; max-width: 440px; padding: 40px 36px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <div class="sidebar-logo" style="margin: 0 auto 16px auto; width: 48px; height: 48px;">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <h2 style="font-size: 24px; margin-bottom: 6px;">Student Information System</h2>
        <p style="color: var(--text-muted); font-size: 13px;">Object-Oriented Design Capstone</p>
      </div>

      <form id="login-form">
        <div class="form-group">
          <label class="form-label" for="login-username">Username or Email</label>
          <input type="text" id="login-username" class="form-control" placeholder="e.g. admin or dr_alan or alice_smith" required>
        </div>

        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="login-password">Password</label>
          <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px;">
          <i class="fa-solid fa-right-to-bracket"></i> Sign In to Portal
        </button>
      </form>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <p style="font-size: 12px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 10px;">Quick Demo Accounts:</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.fillDemo('admin', 'Admin@123')">Admin</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.fillDemo('dr_alan', 'Faculty@123')">Faculty</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.fillDemo('alice_smith', 'Student@123')">Student</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function attachLoginEvents() {
  window.fillDemo = (u, p) => {
    document.getElementById('login-username').value = u;
    document.getElementById('login-password').value = p;
  };

  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value;

    try {
      const res = await authService.login(u, p);
      showToast(`Welcome back, ${res.data.user.username}!`, 'success');
      const route = res.data.user.dashboardRoute || '/admin/dashboard';
      window.location.hash = '#' + route;
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
