const express = require('express');
const teacherController = require('../controllers/teacherController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('teacher', 'admin'));

// Dashboard
router.get('/dashboard/stats', teacherController.getDashboardStats);

// Classes
router.get('/classes', teacherController.getMyClasses);
router.get('/classes/:classId/students', teacherController.getClassStudents);

// Homework
router
    .route('/homework')
    .get(teacherController.getHomework)
    .post(teacherController.createHomework);

router
    .route('/homework/:id')
    .patch(teacherController.updateHomework)
    .delete(teacherController.deleteHomework);

router.get('/homework/:homeworkId/submissions', teacherController.getHomeworkSubmissions);

// Submissions
router.get('/submissions', teacherController.getSubmissions || ((req, res) => res.json({ status: 'success', data: { submissions: [] } })));
router.patch('/submissions/:id/grade', teacherController.gradeSubmission);

// Attendance
router.post('/attendance', teacherController.markAttendance);
router.get('/attendance/:classId', teacherController.getAttendance);
router.get('/attendance/:classId/stats', teacherController.getAttendanceStats);

module.exports = router;
