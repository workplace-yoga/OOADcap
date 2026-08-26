const courseService = require('../../application/CourseService');
const enrollmentService = require('../../application/EnrollmentService');

class CourseController {
  getAll(req, res, next) {
    try {
      const courses = courseService.getAllCourses();
      res.status(200).json({ success: true, data: courses });
    } catch (err) {
      next(err);
    }
  }

  getById(req, res, next) {
    try {
      const course = courseService.getCourseById(req.params.id);
      res.status(200).json({ success: true, data: course });
    } catch (err) {
      next(err);
    }
  }

  create(req, res, next) {
    try {
      const course = courseService.createCourse(req.body);
      res.status(201).json({ success: true, message: 'Course created successfully', data: course });
    } catch (err) {
      next(err);
    }
  }

  assignFaculty(req, res, next) {
    try {
      const { facultyId } = req.body;
      const course = courseService.assignFaculty(req.params.id, facultyId);
      res.status(200).json({ success: true, message: 'Faculty assigned successfully', data: course });
    } catch (err) {
      next(err);
    }
  }

  getFacultyAssignedCourses(req, res, next) {
    try {
      const facultyId = req.user.facultyId;
      const courses = courseService.getCoursesByFaculty(facultyId);
      res.status(200).json({ success: true, data: courses });
    } catch (err) {
      next(err);
    }
  }

  getRoster(req, res, next) {
    try {
      const courseId = req.params.id;
      const roster = enrollmentService.getCourseRoster(courseId);
      res.status(200).json({ success: true, data: roster });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CourseController();
