const express = require('express');
const router = express.Router();
const academicController = require('../controllers/AcademicController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.post('/', roleGuard(['FACULTY']), (req, res, next) => academicController.enterMarks(req, res, next));
router.get('/transcript', roleGuard(['STUDENT']), (req, res, next) => academicController.getMyTranscript(req, res, next));

module.exports = router;
