const User = require('./User');

class Student extends User {
  constructor({ userId, username, passwordHash, email, studentId, rollNumber, fullName, department, currentSemester = 1, dateOfBirth = '', contactNumber = '', enrollments = [], isActive = true, createdAt, lastLogin }) {
    super({ userId, username, passwordHash, email, role: 'STUDENT', isActive, createdAt, lastLogin });
    this.studentId = studentId || `stu_${userId}`;
    this.rollNumber = rollNumber;
    this.fullName = fullName;
    this.department = department;
    this.currentSemester = Number(currentSemester);
    this.dateOfBirth = dateOfBirth;
    this.contactNumber = contactNumber;
    this.enrollments = enrollments;
  }

  getDashboardRoute() {
    return '/student/dashboard';
  }

  getAccessPermissions() {
    return [
      'VIEW_OWN_PROFILE',
      'VIEW_ENROLLED_COURSES',
      'VIEW_OWN_ATTENDANCE',
      'VIEW_OWN_MARKS',
      'VIEW_ACADEMIC_TRANSCRIPT'
    ];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      studentId: this.studentId,
      rollNumber: this.rollNumber,
      fullName: this.fullName,
      department: this.department,
      currentSemester: this.currentSemester,
      dateOfBirth: this.dateOfBirth,
      contactNumber: this.contactNumber,
      permissions: this.getAccessPermissions()
    };
  }
}

module.exports = Student;
