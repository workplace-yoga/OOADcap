import { state } from './StateManager.js';
import { renderLoginView, attachLoginEvents } from '../views/LoginView.js';
import { renderAdminDashboardView, attachAdminEvents } from '../views/AdminDashboardView.js';
import { renderFacultyDashboardView, attachFacultyEvents } from '../views/FacultyDashboardView.js';
import { renderStudentDashboardView, attachStudentEvents } from '../views/StudentDashboardView.js';

class Router {
  constructor(appRootId = 'app-root') {
    this.root = document.getElementById(appRootId);
    window.addEventListener('hashchange', () => this.route());
  }

  async route() {
    const hash = window.location.hash || '#/login';
    const isAuth = state.isAuthenticated();

    if (!isAuth && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }

    if (isAuth && hash === '#/login') {
      const role = state.getUserRole();
      if (role === 'ADMIN') window.location.hash = '#/admin/dashboard';
      else if (role === 'FACULTY') window.location.hash = '#/faculty/dashboard';
      else if (role === 'STUDENT') window.location.hash = '#/student/dashboard';
      return;
    }

    if (hash === '#/login' || hash === '') {
      this.root.innerHTML = renderLoginView();
      attachLoginEvents();
      return;
    }

    // Role-based Router Dispatching
    if (hash.startsWith('#/admin')) {
      if (state.getUserRole() !== 'ADMIN') {
        alert('Access Restricted to Admin Role.');
        window.location.hash = '#/login';
        return;
      }
      let tab = 'overview';
      if (hash.includes('/students')) tab = 'students';
      else if (hash.includes('/faculty')) tab = 'faculty';
      else if (hash.includes('/courses')) tab = 'courses';

      this.root.innerHTML = await renderAdminDashboardView(tab);
      attachAdminEvents();
      return;
    }

    if (hash.startsWith('#/faculty')) {
      if (state.getUserRole() !== 'FACULTY') {
        alert('Access Restricted to Faculty Role.');
        window.location.hash = '#/login';
        return;
      }
      const urlParams = new URLSearchParams(hash.split('?')[1] || '');
      const courseId = urlParams.get('courseId');
      this.root.innerHTML = await renderFacultyDashboardView(courseId);
      attachFacultyEvents();
      return;
    }

    if (hash.startsWith('#/student')) {
      if (state.getUserRole() !== 'STUDENT') {
        alert('Access Restricted to Student Role.');
        window.location.hash = '#/login';
        return;
      }
      this.root.innerHTML = await renderStudentDashboardView();
      attachStudentEvents();
      return;
    }
  }
}

export const router = new Router();
