const db = require('./Database');
const Enrollment = require('../../domain/model/Enrollment');
const Attendance = require('../../domain/model/Attendance');
const AcademicRecord = require('../../domain/model/AcademicRecord');

class SqlEnrollmentRepository {
  findById(enrollmentId) {
    const r = db.findOne('enrollments', row => row.enrollment_id === enrollmentId);
    if (!r) return null;
    return this.#hydrate(r);
  }

  findByStudentId(studentId) {
    const rows = db.find('enrollments', row => row.student_id === studentId);
    return rows.map(r => this.#hydrate(r));
  }

  findByCourseId(courseId) {
    const rows = db.find('enrollments', row => row.course_id === courseId);
    return rows.map(r => this.#hydrate(r));
  }

  findByStudentAndCourse(studentId, courseId, term = 'Fall 2026') {
    const r = db.findOne('enrollments', row => row.student_id === studentId && row.course_id === courseId && row.academic_term === term);
    if (!r) return null;
    return this.#hydrate(r);
  }

  save(enrollmentEntity) {
    const enrollRow = {
      enrollment_id: enrollmentEntity.enrollmentId,
      student_id: enrollmentEntity.studentId,
      course_id: enrollmentEntity.courseId,
      academic_term: enrollmentEntity.academicTerm,
      enrollment_date: enrollmentEntity.enrollmentDate,
      status: enrollmentEntity.status
    };

    const exists = db.findOne('enrollments', r => r.enrollment_id === enrollmentEntity.enrollmentId);
    if (exists) {
      db.update('enrollments', r => r.enrollment_id === enrollmentEntity.enrollmentId, () => enrollRow);
    } else {
      db.insert('enrollments', enrollRow);
    }

    // Save Attendance composition records
    for (const att of enrollmentEntity.attendanceRecords) {
      const attRow = {
        attendance_id: att.attendanceId,
        enrollment_id: enrollmentEntity.enrollmentId,
        session_date: att.sessionDate,
        session_slot: att.sessionSlot,
        status: att.status,
        remarks: att.remarks,
        recorded_by_faculty_id: att.recordedByFacultyId,
        last_modified: att.lastModified
      };
      if (db.findOne('attendance', a => a.attendance_id === att.attendanceId)) {
        db.update('attendance', a => a.attendance_id === att.attendanceId, () => attRow);
      } else {
        db.insert('attendance', attRow);
      }
    }

    // Save Academic Record composition records
    for (const rec of enrollmentEntity.academicRecords) {
      const recRow = {
        record_id: rec.recordId,
        enrollment_id: enrollmentEntity.enrollmentId,
        assessment_type: rec.assessmentType,
        score_obtained: rec.scoreObtained,
        maximum_score: rec.maximumScore,
        weightage_percentage: rec.weightagePercentage,
        feedback_remarks: rec.feedbackRemarks
      };
      if (db.findOne('academic_records', ar => ar.record_id === rec.recordId)) {
        db.update('academic_records', ar => ar.record_id === rec.recordId, () => recRow);
      } else {
        db.insert('academic_records', recRow);
      }
    }

    return enrollmentEntity;
  }

  #hydrate(r) {
    const attRows = db.find('attendance', a => a.enrollment_id === r.enrollment_id);
    const recRows = db.find('academic_records', ar => ar.enrollment_id === r.enrollment_id);

    return new Enrollment({
      enrollmentId: r.enrollment_id,
      studentId: r.student_id,
      courseId: r.course_id,
      academicTerm: r.academic_term,
      enrollmentDate: r.enrollment_date,
      status: r.status,
      attendanceRecords: attRows.map(a => new Attendance({
        attendanceId: a.attendance_id,
        enrollmentId: a.enrollment_id,
        sessionDate: a.session_date,
        sessionSlot: a.session_slot,
        status: a.status,
        remarks: a.remarks,
        recordedByFacultyId: a.recorded_by_faculty_id,
        lastModified: a.last_modified
      })),
      academicRecords: recRows.map(ar => new AcademicRecord({
        recordId: ar.record_id,
        enrollmentId: ar.enrollment_id,
        assessmentType: ar.assessment_type,
        scoreObtained: ar.score_obtained,
        maximumScore: ar.maximum_score,
        weightagePercentage: ar.weightage_percentage,
        feedbackRemarks: ar.feedback_remarks
      }))
    });
  }
}

module.exports = new SqlEnrollmentRepository();
