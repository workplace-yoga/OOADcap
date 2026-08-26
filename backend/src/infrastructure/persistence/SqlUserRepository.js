const db = require('./Database');
const Admin = require('../../domain/model/Admin');
const Faculty = require('../../domain/model/Faculty');
const Student = require('../../domain/model/Student');

class SqlUserRepository {
  findById(userId) {
    const u = db.findOne('users', row => row.user_id === userId);
    if (!u) return null;
    return this.#hydrate(u);
  }

  findByUsername(username) {
    const u = db.findOne('users', row => row.username.toLowerCase() === String(username).toLowerCase());
    if (!u) return null;
    return this.#hydrate(u);
  }

  findByEmail(email) {
    const u = db.findOne('users', row => row.email.toLowerCase() === String(email).toLowerCase());
    if (!u) return null;
    return this.#hydrate(u);
  }

  save(userEntity) {
    const userRow = {
      user_id: userEntity.userId,
      username: userEntity.username,
      password_hash: userEntity.getPasswordHash(),
      email: userEntity.email,
      role: userEntity.role,
      is_active: userEntity.isActive,
      created_at: userEntity.createdAt,
      last_login: userEntity.lastLogin
    };

    const exists = db.findOne('users', row => row.user_id === userEntity.userId);
    if (exists) {
      db.update('users', row => row.user_id === userEntity.userId, () => userRow);
    } else {
      db.insert('users', userRow);
    }

    // Role-specific subclass table persistence
    if (userEntity.role === 'ADMIN') {
      const adminRow = {
        admin_id: userEntity.adminId,
        user_id: userEntity.userId,
        department: userEntity.department,
        office_location: userEntity.officeLocation
      };
      if (db.findOne('admins', r => r.user_id === userEntity.userId)) {
        db.update('admins', r => r.user_id === userEntity.userId, () => adminRow);
      } else {
        db.insert('admins', adminRow);
      }
    } else if (userEntity.role === 'FACULTY') {
      const facultyRow = {
        faculty_id: userEntity.facultyId,
        user_id: userEntity.userId,
        full_name: userEntity.fullName,
        department: userEntity.department,
        designation: userEntity.designation,
        contact_number: userEntity.contactNumber
      };
      if (db.findOne('faculty', r => r.user_id === userEntity.userId)) {
        db.update('faculty', r => r.user_id === userEntity.userId, () => facultyRow);
      } else {
        db.insert('faculty', facultyRow);
      }
    } else if (userEntity.role === 'STUDENT') {
      const studentRow = {
        student_id: userEntity.studentId,
        user_id: userEntity.userId,
        roll_number: userEntity.rollNumber,
        full_name: userEntity.fullName,
        department: userEntity.department,
        current_semester: userEntity.currentSemester,
        date_of_birth: userEntity.dateOfBirth,
        contact_number: userEntity.contactNumber
      };
      if (db.findOne('students', r => r.user_id === userEntity.userId)) {
        db.update('students', r => r.user_id === userEntity.userId, () => studentRow);
      } else {
        db.insert('students', studentRow);
      }
    }

    return userEntity;
  }

  deleteById(userId) {
    db.delete('admins', r => r.user_id === userId);
    db.delete('faculty', r => r.user_id === userId);
    db.delete('students', r => r.user_id === userId);
    return db.delete('users', r => r.user_id === userId) > 0;
  }

  #hydrate(u) {
    if (u.role === 'ADMIN') {
      const a = db.findOne('admins', r => r.user_id === u.user_id) || {};
      return new Admin({
        userId: u.user_id,
        username: u.username,
        passwordHash: u.password_hash,
        email: u.email,
        adminId: a.admin_id,
        department: a.department,
        officeLocation: a.office_location,
        isActive: u.is_active,
        createdAt: u.created_at,
        lastLogin: u.last_login
      });
    } else if (u.role === 'FACULTY') {
      const f = db.findOne('faculty', r => r.user_id === u.user_id) || {};
      return new Faculty({
        userId: u.user_id,
        username: u.username,
        passwordHash: u.password_hash,
        email: u.email,
        facultyId: f.faculty_id,
        fullName: f.full_name,
        department: f.department,
        designation: f.designation,
        contactNumber: f.contact_number,
        isActive: u.is_active,
        createdAt: u.created_at,
        lastLogin: u.last_login
      });
    } else if (u.role === 'STUDENT') {
      const s = db.findOne('students', r => r.user_id === u.user_id) || {};
      return new Student({
        userId: u.user_id,
        username: u.username,
        passwordHash: u.password_hash,
        email: u.email,
        studentId: s.student_id,
        rollNumber: s.roll_number,
        fullName: s.full_name,
        department: s.department,
        currentSemester: s.current_semester,
        dateOfBirth: s.date_of_birth,
        contactNumber: s.contact_number,
        isActive: u.is_active,
        createdAt: u.created_at,
        lastLogin: u.last_login
      });
    }
    return null;
  }
}

module.exports = new SqlUserRepository();
