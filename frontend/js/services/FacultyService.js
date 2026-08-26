import { api } from '../core/ApiClient.js';

class FacultyService {
  getMyCourses() { return api.get('/courses/my-assigned'); }
  getCourseRoster(courseId) { return api.get(`/courses/${courseId}/roster`); }
  recordAttendance(payload) { return api.post('/attendance', payload); }
  submitMarks(payload) { return api.post('/academic-records', payload); }
}

export const facultyService = new FacultyService();
