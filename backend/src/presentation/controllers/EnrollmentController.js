const enrollmentService = require('../../application/EnrollmentService');

class EnrollmentController {
  enroll(req, res, next) {
    try {
      const { studentId, courseId, academicTerm } = req.body;
      const enrollment = enrollmentService.enrollStudent(studentId, courseId, academicTerm);
      res.status(201).json({ success: true, message: 'Student enrolled successfully', data: enrollment });
    } catch (err) {
      next(err);
    }
  }

  getMyCourses(req, res, next) {
    try {
      const studentId = req.user.studentId;
      const enrollments = enrollmentService.getStudentEnrollments(studentId);
      res.status(200).json({ success: true, data: enrollments });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EnrollmentController();
