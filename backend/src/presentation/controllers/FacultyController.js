const facultyService = require('../../application/FacultyService');

class FacultyController {
  getAll(req, res, next) {
    try {
      const list = facultyService.getAllFaculty();
      res.status(200).json({ success: true, data: list });
    } catch (err) {
      next(err);
    }
  }

  getById(req, res, next) {
    try {
      const faculty = facultyService.getFacultyById(req.params.id);
      res.status(200).json({ success: true, data: faculty });
    } catch (err) {
      next(err);
    }
  }

  create(req, res, next) {
    try {
      const faculty = facultyService.registerFaculty(req.body);
      res.status(201).json({ success: true, message: 'Faculty registered successfully', data: faculty });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FacultyController();
