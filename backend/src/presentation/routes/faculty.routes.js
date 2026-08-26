const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/FacultyController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.get('/', roleGuard(['ADMIN']), (req, res, next) => facultyController.getAll(req, res, next));
router.get('/:id', roleGuard(['ADMIN']), (req, res, next) => facultyController.getById(req, res, next));
router.post('/', roleGuard(['ADMIN']), (req, res, next) => facultyController.create(req, res, next));

module.exports = router;
