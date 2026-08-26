import { api } from '../core/ApiClient.js';

class StudentService {
  getMyCourses() { return api.get('/enrollments/my-courses'); }
  getMyAttendance() { return api.get('/attendance/my-records'); }
  getMyTranscript() { return api.get('/academic-records/transcript'); }
}

export const studentService = new StudentService();
