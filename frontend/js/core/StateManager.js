/**
 * Central State Manager for User Session & Reactive UI notifications.
 */
class StateManager {
  constructor() {
    this.user = this.#loadUser();
    this.token = localStorage.getItem('sis_token') || null;
  }

  #loadUser() {
    try {
      const raw = localStorage.getItem('sis_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  setUser(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem('sis_user', JSON.stringify(user));
    localStorage.setItem('sis_token', token);
  }

  clearUser() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('sis_user');
    localStorage.removeItem('sis_token');
  }

  isAuthenticated() {
    return Boolean(this.token && this.user);
  }

  getUserRole() {
    return this.user ? this.user.role : null;
  }
}

export const state = new StateManager();

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

export function openModal(htmlContent) {
  const container = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (container && content) {
    content.innerHTML = htmlContent;
    container.classList.remove('hidden');
  }
}

export function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) {
    container.classList.add('hidden');
  }
}
