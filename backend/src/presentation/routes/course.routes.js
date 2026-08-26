const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.get('/', (req, res, next) => courseController.getAll(req, res, next));
router.get('/my-assigned', roleGuard(['FACULTY']), (req, res, next) => courseController.getFacultyAssignedCourses(req, res, next));
router.get('/:id', (req, res, next) => courseController.getById(req, res, next));
router.post('/', roleGuard(['ADMIN']), (req, res, next) => courseController.create(req, res, next));
router.put('/:id/assign-faculty', roleGuard(['ADMIN']), (req, res, next) => courseController.assignFaculty(req, res, next));
router.get('/:id/roster', roleGuard(['ADMIN', 'FACULTY']), (req, res, next) => courseController.getRoster(req, res, next));

module.exports = router;
