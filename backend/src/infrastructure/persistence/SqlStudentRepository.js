const db = require('./Database');
const Student = require('../../domain/model/Student');

class SqlStudentRepository {
  findAll() {
    const rows = db.find('students');
    return rows.map(r => {
      const u = db.findOne('users', uRow => uRow.user_id === r.user_id) || {};
      return new Student({
        userId: r.user_id,
        username: u.username || '',
        passwordHash: u.password_hash || '',
        email: u.email || '',
        studentId: r.student_id,
        rollNumber: r.roll_number,
        fullName: r.full_name,
        department: r.department,
        currentSemester: r.current_semester,
        dateOfBirth: r.date_of_birth,
        contactNumber: r.contact_number,
        isActive: u.is_active !== undefined ? u.is_active : true
      });
    });
  }

  findById(studentId) {
    const r = db.findOne('students', row => row.student_id === studentId || row.user_id === studentId);
    if (!r) return null;
    const u = db.findOne('users', uRow => uRow.user_id === r.user_id) || {};
    return new Student({
      userId: r.user_id,
      username: u.username || '',
      passwordHash: u.password_hash || '',
      email: u.email || '',
      studentId: r.student_id,
      rollNumber: r.roll_number,
      fullName: r.full_name,
      department: r.department,
      currentSemester: r.current_semester,
      dateOfBirth: r.date_of_birth,
      contactNumber: r.contact_number,
      isActive: u.is_active !== undefined ? u.is_active : true
    });
  }

  findByRollNumber(rollNo) {
    const r = db.findOne('students', row => row.roll_number.toLowerCase() === String(rollNo).toLowerCase());
    if (!r) return null;
    return this.findById(r.student_id);
  }
}

module.exports = new SqlStudentRepository();
