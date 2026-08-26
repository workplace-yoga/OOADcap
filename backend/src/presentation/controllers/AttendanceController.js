const attendanceService = require('../../application/AttendanceService');

class AttendanceController {
  record(req, res, next) {
    try {
      const { courseId, sessionDate, sessionSlot, entries } = req.body;
      const result = attendanceService.recordAttendance(req.user.facultyId, courseId, sessionDate, sessionSlot, entries);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  getMyAttendance(req, res, next) {
    try {
      const studentId = req.user.studentId;
      const records = attendanceService.getStudentAttendanceSummary(studentId);
      res.status(200).json({ success: true, data: records });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AttendanceController();
