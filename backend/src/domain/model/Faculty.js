const User = require('./User');

class Faculty extends User {
  constructor({ userId, username, passwordHash, email, facultyId, fullName, department, designation, contactNumber = '', assignedCourses = [], isActive = true, createdAt, lastLogin }) {
    super({ userId, username, passwordHash, email, role: 'FACULTY', isActive, createdAt, lastLogin });
    this.facultyId = facultyId || `fac_${userId}`;
    this.fullName = fullName;
    this.department = department;
    this.designation = designation || 'Assistant Professor';
    this.contactNumber = contactNumber;
    this.assignedCourses = assignedCourses;
  }

  getDashboardRoute() {
    return '/faculty/dashboard';
  }

  getAccessPermissions() {
    return [
      'VIEW_ASSIGNED_COURSES',
      'VIEW_COURSE_ROSTER',
      'RECORD_ATTENDANCE',
      'UPDATE_ATTENDANCE',
      'SUBMIT_MARKS',
      'UPDATE_MARKS'
    ];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      facultyId: this.facultyId,
      fullName: this.fullName,
      department: this.department,
      designation: this.designation,
      contactNumber: this.contactNumber,
      assignedCourses: this.assignedCourses,
      permissions: this.getAccessPermissions()
    };
  }
}

module.exports = Faculty;
