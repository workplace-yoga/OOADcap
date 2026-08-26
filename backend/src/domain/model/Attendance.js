class Attendance {
  static ALLOWED_STATUSES = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];

  constructor({ attendanceId, enrollmentId, sessionDate, sessionSlot = 1, status = 'PRESENT', remarks = '', recordedByFacultyId = null, lastModified = new Date().toISOString() }) {
    this.attendanceId = attendanceId;
    this.enrollmentId = enrollmentId;
    this.sessionDate = sessionDate;
    this.sessionSlot = Number(sessionSlot);
    this.status = Attendance.validateStatus(status);
    this.remarks = remarks;
    this.recordedByFacultyId = recordedByFacultyId;
    this.lastModified = lastModified;
  }

  static validateStatus(status) {
    const s = String(status).toUpperCase();
    if (!Attendance.ALLOWED_STATUSES.includes(s)) {
      throw new Error(`Invalid attendance status '${status}'. Allowed: ${Attendance.ALLOWED_STATUSES.join(', ')}`);
    }
    return s;
  }

  updateStatus(newStatus, reason = '') {
    this.status = Attendance.validateStatus(newStatus);
    if (reason) this.remarks = reason;
    this.lastModified = new Date().toISOString();
  }

  toJSON() {
    return {
      attendanceId: this.attendanceId,
      enrollmentId: this.enrollmentId,
      sessionDate: this.sessionDate,
      sessionSlot: this.sessionSlot,
      status: this.status,
      remarks: this.remarks,
      recordedByFacultyId: this.recordedByFacultyId,
      lastModified: this.lastModified
    };
  }
}

module.exports = Attendance;
