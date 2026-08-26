const Attendance = require('./Attendance');
const AcademicRecord = require('./AcademicRecord');

class Enrollment {
  constructor({ enrollmentId, studentId, courseId, academicTerm = 'Fall 2026', enrollmentDate = new Date().toISOString(), status = 'ACTIVE', attendanceRecords = [], academicRecords = [] }) {
    this.enrollmentId = enrollmentId;
    this.studentId = studentId;
    this.courseId = courseId;
    this.academicTerm = academicTerm;
    this.enrollmentDate = enrollmentDate;
    this.status = status;
    this.attendanceRecords = attendanceRecords.map(a => a instanceof Attendance ? a : new Attendance(a));
    this.academicRecords = academicRecords.map(m => m instanceof AcademicRecord ? m : new AcademicRecord(m));
  }

  addAttendance(attendance) {
    const att = attendance instanceof Attendance ? attendance : new Attendance(attendance);
    this.attendanceRecords.push(att);
    return att;
  }

  addAcademicRecord(record) {
    const rec = record instanceof AcademicRecord ? record : new AcademicRecord(record);
    this.academicRecords.push(rec);
    return rec;
  }

  calculateAttendancePercentage() {
    if (this.attendanceRecords.length === 0) return 100.0;
    const attended = this.attendanceRecords.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
    return Number(((attended / this.attendanceRecords.length) * 100).toFixed(1));
  }

  calculateTotalMarks() {
    if (this.academicRecords.length === 0) return 0.0;
    const totalScore = this.academicRecords.reduce((sum, r) => sum + r.scoreObtained, 0);
    const totalMax = this.academicRecords.reduce((sum, r) => sum + r.maximumScore, 0);
    if (totalMax === 0) return 0.0;
    return Number(((totalScore / totalMax) * 100).toFixed(1));
  }

  computeFinalGrade() {
    const pct = this.calculateTotalMarks();
    if (this.academicRecords.length === 0) return 'Incomplete';
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B';
    if (pct >= 60) return 'C';
    if (pct >= 50) return 'D';
    return 'F';
  }

  toJSON() {
    return {
      enrollmentId: this.enrollmentId,
      studentId: this.studentId,
      courseId: this.courseId,
      academicTerm: this.academicTerm,
      enrollmentDate: this.enrollmentDate,
      status: this.status,
      attendancePercentage: this.calculateAttendancePercentage(),
      totalSessions: this.attendanceRecords.length,
      averageMark: this.calculateTotalMarks(),
      grade: this.computeFinalGrade(),
      attendanceRecords: this.attendanceRecords.map(a => a.toJSON()),
      academicRecords: this.academicRecords.map(r => r.toJSON())
    };
  }
}

module.exports = Enrollment;
