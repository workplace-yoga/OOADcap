const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/EnrollmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.post('/', roleGuard(['ADMIN']), (req, res, next) => enrollmentController.enroll(req, res, next));
router.get('/my-courses', roleGuard(['STUDENT']), (req, res, next) => enrollmentController.getMyCourses(req, res, next));

module.exports = router;
