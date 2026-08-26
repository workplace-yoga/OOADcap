const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.post('/', roleGuard(['FACULTY']), (req, res, next) => attendanceController.record(req, res, next));
router.get('/my-records', roleGuard(['STUDENT']), (req, res, next) => attendanceController.getMyAttendance(req, res, next));

module.exports = router;
