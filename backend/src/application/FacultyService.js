const userRepo = require('../infrastructure/persistence/SqlUserRepository');
const facultyRepo = require('../infrastructure/persistence/SqlFacultyRepository');
const Faculty = require('../domain/model/Faculty');
const PasswordHasher = require('../infrastructure/security/PasswordHasher');

class FacultyService {
  getAllFaculty() {
    const facultyList = facultyRepo.findAll();
    return facultyList.map(f => f.toJSON());
  }

  getFacultyById(facultyId) {
    const faculty = facultyRepo.findById(facultyId);
    if (!faculty) {
      const err = new Error(`Faculty '${facultyId}' not found.`);
      err.statusCode = 404;
      throw err;
    }
    return faculty.toJSON();
  }

  registerFaculty({ username, password, email, fullName, department, designation, contactNumber }) {
    if (!username || !password || !email || !fullName || !department) {
      const err = new Error('Missing mandatory faculty registration fields.');
      err.statusCode = 400;
      throw err;
    }

    if (userRepo.findByUsername(username)) {
      const err = new Error(`Username '${username}' is already taken.`);
      err.statusCode = 409;
      throw err;
    }

    const userId = `usr_fac_${Date.now()}`;
    const facultyId = `fac_${Date.now()}`;
    const passwordHash = PasswordHasher.hash(password);

    const facultyEntity = new Faculty({
      userId,
      username,
      passwordHash,
      email,
      facultyId,
      fullName,
      department,
      designation: designation || 'Assistant Professor',
      contactNumber: contactNumber || ''
    });

    userRepo.save(facultyEntity);
    return facultyEntity.toJSON();
  }
}

module.exports = new FacultyService();
