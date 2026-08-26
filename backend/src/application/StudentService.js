const userRepo = require('../infrastructure/persistence/SqlUserRepository');
const studentRepo = require('../infrastructure/persistence/SqlStudentRepository');
const Student = require('../domain/model/Student');
const PasswordHasher = require('../infrastructure/security/PasswordHasher');

class StudentService {
  getAllStudents() {
    const students = studentRepo.findAll();
    return students.map(s => s.toJSON());
  }

  getStudentById(studentId) {
    const student = studentRepo.findById(studentId);
    if (!student) {
      const err = new Error(`Student '${studentId}' not found.`);
      err.statusCode = 404;
      throw err;
    }
    return student.toJSON();
  }

  registerStudent({ username, password, email, rollNumber, fullName, department, currentSemester, dateOfBirth, contactNumber }) {
    if (!username || !password || !email || !rollNumber || !fullName || !department) {
      const err = new Error('Missing mandatory student registration fields.');
      err.statusCode = 400;
      throw err;
    }

    if (userRepo.findByUsername(username)) {
      const err = new Error(`Username '${username}' is already taken.`);
      err.statusCode = 409;
      throw err;
    }

    if (userRepo.findByEmail(email)) {
      const err = new Error(`Email '${email}' is already registered.`);
      err.statusCode = 409;
      throw err;
    }

    if (studentRepo.findByRollNumber(rollNumber)) {
      const err = new Error(`Roll Number '${rollNumber}' is already registered.`);
      err.statusCode = 409;
      throw err;
    }

    const userId = `usr_stu_${Date.now()}`;
    const studentId = `stu_${Date.now()}`;
    const passwordHash = PasswordHasher.hash(password);

    const studentEntity = new Student({
      userId,
      username,
      passwordHash,
      email,
      studentId,
      rollNumber,
      fullName,
      department,
      currentSemester: Number(currentSemester) || 1,
      dateOfBirth: dateOfBirth || '2004-01-01',
      contactNumber: contactNumber || ''
    });

    userRepo.save(studentEntity);
    return studentEntity.toJSON();
  }

  updateStudent(studentId, data) {
    const student = studentRepo.findById(studentId);
    if (!student) {
      const err = new Error(`Student '${studentId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    if (data.fullName) student.fullName = data.fullName;
    if (data.department) student.department = data.department;
    if (data.currentSemester) student.currentSemester = Number(data.currentSemester);
    if (data.contactNumber) student.contactNumber = data.contactNumber;
    if (data.dateOfBirth) student.dateOfBirth = data.dateOfBirth;

    userRepo.save(student);
    return student.toJSON();
  }

  deleteStudent(studentId) {
    const student = studentRepo.findById(studentId);
    if (!student) {
      const err = new Error(`Student '${studentId}' not found.`);
      err.statusCode = 404;
      throw err;
    }
    userRepo.deleteById(student.userId);
    return { success: true, message: `Student '${studentId}' deleted successfully.` };
  }
}

module.exports = new StudentService();
