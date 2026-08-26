const db = require('./Database');
const Faculty = require('../../domain/model/Faculty');

class SqlFacultyRepository {
  findAll() {
    const rows = db.find('faculty');
    return rows.map(r => {
      const u = db.findOne('users', uRow => uRow.user_id === r.user_id) || {};
      return new Faculty({
        userId: r.user_id,
        username: u.username || '',
        passwordHash: u.password_hash || '',
        email: u.email || '',
        facultyId: r.faculty_id,
        fullName: r.full_name,
        department: r.department,
        designation: r.designation,
        contactNumber: r.contact_number,
        isActive: u.is_active !== undefined ? u.is_active : true
      });
    });
  }

  findById(facultyId) {
    const r = db.findOne('faculty', row => row.faculty_id === facultyId || row.user_id === facultyId);
    if (!r) return null;
    const u = db.findOne('users', uRow => uRow.user_id === r.user_id) || {};
    return new Faculty({
      userId: r.user_id,
      username: u.username || '',
      passwordHash: u.password_hash || '',
      email: u.email || '',
      facultyId: r.faculty_id,
      fullName: r.full_name,
      department: r.department,
      designation: r.designation,
      contactNumber: r.contact_number,
      isActive: u.is_active !== undefined ? u.is_active : true
    });
  }
}

module.exports = new SqlFacultyRepository();
