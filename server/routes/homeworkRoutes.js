const express = require('express');
const homeworkController = require('../controllers/homeworkController');
const authController = require('../controllers/authController');

const router = express.Router();

// All routes require authentication
router.use(authController.protect);

router
    .route('/')
    .get(homeworkController.getAllHomework)
    .post(authController.restrictTo('admin', 'teacher'), homeworkController.createHomework);

router
    .route('/:id')
    .get(homeworkController.getHomeworkById)
    .patch(authController.restrictTo('admin', 'teacher'), homeworkController.updateHomework)
    .delete(authController.restrictTo('admin', 'teacher'), homeworkController.deleteHomework);

router
    .route('/:homeworkId/submit')
    .post(authController.restrictTo('student', 'parent'), homeworkController.submitHomework);

router
    .route('/:homeworkId/submissions')
    .get(authController.restrictTo('admin', 'teacher'), homeworkController.getSubmissions);

module.exports = router;
