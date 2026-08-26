const enrollmentRepo = require('../infrastructure/persistence/SqlEnrollmentRepository');
const courseRepo = require('../infrastructure/persistence/SqlCourseRepository');
const Attendance = require('../domain/model/Attendance');

class AttendanceService {
  recordAttendance(facultyId, courseId, sessionDate, sessionSlot, entries) {
    if (!courseId || !sessionDate || !entries || !Array.isArray(entries)) {
      const err = new Error('Invalid attendance submission payload.');
      err.statusCode = 400;
      throw err;
    }

    const course = courseRepo.findById(courseId);
    if (!course) {
      const err = new Error(`Course '${courseId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    let recordsCreated = 0;
    for (const item of entries) {
      const enrollment = enrollmentRepo.findByStudentAndCourse(item.studentId, courseId);
      if (enrollment) {
        const attendanceId = `att_${Date.now()}_${Math.floor(Math.random()*1000)}`;
        const att = new Attendance({
          attendanceId,
          enrollmentId: enrollment.enrollmentId,
          sessionDate,
          sessionSlot: sessionSlot || 1,
          status: item.status || 'PRESENT',
          remarks: item.remarks || '',
          recordedByFacultyId: facultyId
        });
        enrollment.addAttendance(att);
        enrollmentRepo.save(enrollment);
        recordsCreated++;
      }
    }

    return { success: true, message: `Recorded attendance for ${recordsCreated} student(s).`, recordsCreated };
  }

  getStudentAttendanceSummary(studentId) {
    const enrollments = enrollmentRepo.findByStudentId(studentId);
    return enrollments.map(e => {
      const course = courseRepo.findById(e.courseId);
      return {
        courseCode: course ? course.courseCode : 'N/A',
        courseTitle: course ? course.title : 'N/A',
        attendancePercentage: e.calculateAttendancePercentage(),
        totalSessions: e.attendanceRecords.length,
        logs: e.attendanceRecords.map(a => a.toJSON())
      };
    });
  }
}

module.exports = new AttendanceService();
