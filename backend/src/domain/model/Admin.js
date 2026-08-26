const User = require('./User');

class Admin extends User {
  constructor({ userId, username, passwordHash, email, adminId, department, officeLocation = '', isActive = true, createdAt, lastLogin }) {
    super({ userId, username, passwordHash, email, role: 'ADMIN', isActive, createdAt, lastLogin });
    this.adminId = adminId || `adm_${userId}`;
    this.department = department || 'Administration';
    this.officeLocation = officeLocation;
  }

  getDashboardRoute() {
    return '/admin/dashboard';
  }

  getAccessPermissions() {
    return [
      'MANAGE_USERS',
      'MANAGE_STUDENTS',
      'MANAGE_FACULTY',
      'MANAGE_COURSES',
      'ASSIGN_FACULTY',
      'MANAGE_ENROLLMENTS',
      'VIEW_SYSTEM_REPORTS'
    ];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      adminId: this.adminId,
      department: this.department,
      officeLocation: this.officeLocation,
      permissions: this.getAccessPermissions()
    };
  }
}

module.exports = Admin;
