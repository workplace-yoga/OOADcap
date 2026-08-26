const studentService = require('../../application/StudentService');

class StudentController {
  getAll(req, res, next) {
    try {
      const students = studentService.getAllStudents();
      res.status(200).json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  }

  getById(req, res, next) {
    try {
      const studentId = req.params.id;
      // If student role, ensure accessing self only
      if (req.user.role === 'STUDENT' && req.user.studentId !== studentId && req.user.userId !== studentId) {
        return res.status(403).json({ success: false, message: 'Access denied to other student records.' });
      }
      const student = studentService.getStudentById(studentId);
      res.status(200).json({ success: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  create(req, res, next) {
    try {
      const student = studentService.registerStudent(req.body);
      res.status(201).json({ success: true, message: 'Student registered successfully', data: student });
    } catch (err) {
      next(err);
    }
  }

  update(req, res, next) {
    try {
      const updated = studentService.updateStudent(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Student updated successfully', data: updated });
    } catch (err) {
      next(err);
    }
  }

  delete(req, res, next) {
    try {
      const result = studentService.deleteStudent(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StudentController();
