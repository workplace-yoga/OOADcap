const academicService = require('../../application/AcademicService');

class AcademicController {
  enterMarks(req, res, next) {
    try {
      const { courseId, assessmentType, maximumScore, weightagePercentage, entries } = req.body;
      const result = academicService.enterMarks(req.user.facultyId, courseId, assessmentType, maximumScore, weightagePercentage, entries);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  getMyTranscript(req, res, next) {
    try {
      const studentId = req.user.studentId;
      const transcript = academicService.getStudentTranscript(studentId);
      res.status(200).json({ success: true, data: transcript });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AcademicController();
