const courseRepo = require('../infrastructure/persistence/SqlCourseRepository');
const facultyRepo = require('../infrastructure/persistence/SqlFacultyRepository');
const Course = require('../domain/model/Course');

class CourseService {
  getAllCourses() {
    const courses = courseRepo.findAll();
    return courses.map(c => c.toJSON());
  }

  getCourseById(courseId) {
    const course = courseRepo.findById(courseId);
    if (!course) {
      const err = new Error(`Course '${courseId}' not found.`);
      err.statusCode = 404;
      throw err;
    }
    return course.toJSON();
  }

  createCourse({ courseCode, title, creditUnits, department, description, facultyId }) {
    if (!courseCode || !title || !department) {
      const err = new Error('Course code, title, and department are required.');
      err.statusCode = 400;
      throw err;
    }

    if (courseRepo.findByCode(courseCode)) {
      const err = new Error(`Course code '${courseCode}' already exists.`);
      err.statusCode = 409;
      throw err;
    }

    let facultyName = null;
    if (facultyId) {
      const faculty = facultyRepo.findById(facultyId);
      if (faculty) facultyName = faculty.fullName;
    }

    const courseId = `crs_${Date.now()}`;
    const course = new Course({
      courseId,
      courseCode,
      title,
      creditUnits: Number(creditUnits) || 3,
      department,
      description: description || '',
      facultyId: facultyId || null,
      facultyName
    });

    courseRepo.save(course);
    return course.toJSON();
  }

  assignFaculty(courseId, facultyId) {
    const course = courseRepo.findById(courseId);
    if (!course) {
      const err = new Error(`Course '${courseId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    const faculty = facultyRepo.findById(facultyId);
    if (!faculty) {
      const err = new Error(`Faculty '${facultyId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    course.assignFaculty(faculty.facultyId, faculty.fullName);
    courseRepo.save(course);
    return course.toJSON();
  }

  getCoursesByFaculty(facultyId) {
    const courses = courseRepo.findByFacultyId(facultyId);
    return courses.map(c => c.toJSON());
  }
}

module.exports = new CourseService();
