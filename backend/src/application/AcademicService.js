const enrollmentRepo = require('../infrastructure/persistence/SqlEnrollmentRepository');
const courseRepo = require('../infrastructure/persistence/SqlCourseRepository');
const AcademicRecord = require('../domain/model/AcademicRecord');

class AcademicService {
  enterMarks(facultyId, courseId, assessmentType, maximumScore, weightagePercentage, entries) {
    if (!courseId || !assessmentType || !entries || !Array.isArray(entries)) {
      const err = new Error('Invalid marks submission payload.');
      err.statusCode = 400;
      throw err;
    }

    let entriesSaved = 0;
    for (const item of entries) {
      const enrollment = enrollmentRepo.findByStudentAndCourse(item.studentId, courseId);
      if (enrollment) {
        const recordId = `rec_${Date.now()}_${Math.floor(Math.random()*1000)}`;
        const record = new AcademicRecord({
          recordId,
          enrollmentId: enrollment.enrollmentId,
          assessmentType,
          scoreObtained: Number(item.scoreObtained),
          maximumScore: Number(maximumScore) || 100,
          weightagePercentage: Number(weightagePercentage) || 0,
          feedbackRemarks: item.feedbackRemarks || ''
        });
        enrollment.addAcademicRecord(record);
        enrollmentRepo.save(enrollment);
        entriesSaved++;
      }
    }

    return { success: true, message: `Marks submitted for ${entriesSaved} student(s).`, entriesSaved };
  }

  getStudentTranscript(studentId) {
    const enrollments = enrollmentRepo.findByStudentId(studentId);
    return enrollments.map(e => {
      const course = courseRepo.findById(e.courseId);
      return {
        courseCode: course ? course.courseCode : 'N/A',
        courseTitle: course ? course.title : 'N/A',
        creditUnits: course ? course.creditUnits : 0,
        averagePercentage: e.calculateTotalMarks(),
        finalGrade: e.computeFinalGrade(),
        assessments: e.academicRecords.map(r => r.toJSON())
      };
    });
  }
}

module.exports = new AcademicService();
