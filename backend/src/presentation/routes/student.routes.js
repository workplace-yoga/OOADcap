const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');

router.use(authMiddleware);

router.get('/', roleGuard(['ADMIN']), (req, res, next) => studentController.getAll(req, res, next));
router.get('/:id', roleGuard(['ADMIN', 'STUDENT']), (req, res, next) => studentController.getById(req, res, next));
router.post('/', roleGuard(['ADMIN']), (req, res, next) => studentController.create(req, res, next));
router.put('/:id', roleGuard(['ADMIN']), (req, res, next) => studentController.update(req, res, next));
router.delete('/:id', roleGuard(['ADMIN']), (req, res, next) => studentController.delete(req, res, next));

module.exports = router;
