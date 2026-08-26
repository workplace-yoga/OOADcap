import { api } from '../core/ApiClient.js';

class AdminService {
  getStudents() { return api.get('/students'); }
  createStudent(data) { return api.post('/students', data); }
  updateStudent(id, data) { return api.put(`/students/${id}`, data); }
  deleteStudent(id) { return api.delete(`/students/${id}`); }

  getFaculty() { return api.get('/faculty'); }
  createFaculty(data) { return api.post('/faculty', data); }

  getCourses() { return api.get('/courses'); }
  createCourse(data) { return api.post('/courses', data); }
  assignFaculty(courseId, facultyId) { return api.put(`/courses/${courseId}/assign-faculty`, { facultyId }); }
  enrollStudent(studentId, courseId, academicTerm) { return api.post('/enrollments', { studentId, courseId, academicTerm }); }
}

export const adminService = new AdminService();
