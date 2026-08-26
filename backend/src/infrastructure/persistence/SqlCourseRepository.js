const db = require('./Database');
const Course = require('../../domain/model/Course');

class SqlCourseRepository {
  findAll() {
    const rows = db.find('courses');
    return rows.map(r => {
      let fName = null;
      if (r.faculty_id) {
        const f = db.findOne('faculty', fRow => fRow.faculty_id === r.faculty_id);
        if (f) fName = f.full_name;
      }
      return new Course({
        courseId: r.course_id,
        courseCode: r.course_code,
        title: r.title,
        creditUnits: r.credit_units,
        department: r.department,
        description: r.description,
        facultyId: r.faculty_id,
        facultyName: fName,
        isActive: r.is_active
      });
    });
  }

  findById(courseId) {
    const r = db.findOne('courses', row => row.course_id === courseId);
    if (!r) return null;
    let fName = null;
    if (r.faculty_id) {
      const f = db.findOne('faculty', fRow => fRow.faculty_id === r.faculty_id);
      if (f) fName = f.full_name;
    }
    return new Course({
      courseId: r.course_id,
      courseCode: r.course_code,
      title: r.title,
      creditUnits: r.credit_units,
      department: r.department,
      description: r.description,
      facultyId: r.faculty_id,
      facultyName: fName,
      isActive: r.is_active
    });
  }

  findByCode(code) {
    const r = db.findOne('courses', row => row.course_code.toUpperCase() === String(code).toUpperCase());
    if (!r) return null;
    return this.findById(r.course_id);
  }

  findByFacultyId(facultyId) {
    const rows = db.find('courses', row => row.faculty_id === facultyId);
    return rows.map(r => this.findById(r.course_id));
  }

  save(courseEntity) {
    const courseRow = {
      course_id: courseEntity.courseId,
      course_code: courseEntity.courseCode,
      title: courseEntity.title,
      credit_units: courseEntity.creditUnits,
      department: courseEntity.department,
      description: courseEntity.description,
      faculty_id: courseEntity.facultyId,
      is_active: courseEntity.isActive
    };

    const exists = db.findOne('courses', row => row.course_id === courseEntity.courseId);
    if (exists) {
      db.update('courses', row => row.course_id === courseEntity.courseId, () => courseRow);
    } else {
      db.insert('courses', courseRow);
    }
    return courseEntity;
  }

  deleteById(courseId) {
    return db.delete('courses', r => r.course_id === courseId) > 0;
  }
}

module.exports = new SqlCourseRepository();
