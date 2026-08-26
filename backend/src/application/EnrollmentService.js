const enrollmentRepo = require('../infrastructure/persistence/SqlEnrollmentRepository');
const studentRepo = require('../infrastructure/persistence/SqlStudentRepository');
const courseRepo = require('../infrastructure/persistence/SqlCourseRepository');
const Enrollment = require('../domain/model/Enrollment');

class EnrollmentService {
  enrollStudent(studentId, courseId, term = 'Fall 2026') {
    const student = studentRepo.findById(studentId);
    if (!student) {
      const err = new Error(`Student '${studentId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    const course = courseRepo.findById(courseId);
    if (!course) {
      const err = new Error(`Course '${courseId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    const existing = enrollmentRepo.findByStudentAndCourse(student.studentId, course.courseId, term);
    if (existing) {
      const err = new Error(`Student is already enrolled in '${course.courseCode}' for '${term}'.`);
      err.statusCode = 409;
      throw err;
    }

    const enrollmentId = `enr_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    const enrollment = new Enrollment({
      enrollmentId,
      studentId: student.studentId,
      courseId: course.courseId,
      academicTerm: term,
      status: 'ACTIVE'
    });

    enrollmentRepo.save(enrollment);
    return enrollment.toJSON();
  }

  getStudentEnrollments(studentId) {
    const enrollments = enrollmentRepo.findByStudentId(studentId);
    return enrollments.map(e => {
      const course = courseRepo.findById(e.courseId);
      return {
        ...e.toJSON(),
        courseDetails: course ? course.toJSON() : null
      };
    });
  }

  getCourseRoster(courseId) {
    const enrollments = enrollmentRepo.findByCourseId(courseId);
    return enrollments.map(e => {
      const student = studentRepo.findById(e.studentId);
      return {
        enrollmentId: e.enrollmentId,
        student: student ? student.toJSON() : null,
        status: e.status,
        attendancePercentage: e.calculateAttendancePercentage(),
        averageMark: e.calculateTotalMarks(),
        grade: e.computeFinalGrade()
      };
    });
  }
}

module.exports = new EnrollmentService();
