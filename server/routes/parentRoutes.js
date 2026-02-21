const express = require('express');
const parentController = require('../controllers/parentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('parent', 'admin'));

// Dashboard
router.get('/dashboard/stats', parentController.getDashboardStats);

// Children
router.get('/children', parentController.getMyChildren);
router.get('/children/:studentId', parentController.getChildDetails || ((req, res) => res.json({ status: 'success', data: {} })));

// Homework
router.get('/children/:studentId/homework', parentController.getChildHomework);
router.get('/homework', parentController.getAllChildrenHomework || ((req, res) => res.json({ status: 'success', data: { homework: [] } })));

// Grades
router.get('/children/:studentId/grades', parentController.getChildGrades || ((req, res) => res.json({ status: 'success', data: { grades: [] } })));

// Attendance
router.get('/children/:studentId/attendance', parentController.getChildAttendance);

// Progress
router.get('/children/:studentId/progress', parentController.getChildProgress || ((req, res) => res.json({ status: 'success', data: { progress: {} } })));

module.exports = router;
