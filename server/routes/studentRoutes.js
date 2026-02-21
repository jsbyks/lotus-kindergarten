const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('student', 'admin'));

// Dashboard
router.get('/dashboard', studentController.getDashboard || ((req, res) => res.json({ status: 'success', data: { message: 'Dashboard coming soon' } })));

// Homework
router.get('/homework', studentController.getMyHomework);
router.post('/homework/:homeworkId/submit', studentController.submitHomework);
router.get('/submissions', studentController.getMySubmissions);

// Grades
router.get('/grades', studentController.getMyGrades || ((req, res) => res.json({ status: 'success', data: { grades: [] } })));

// Games
router.get('/games', studentController.getAvailableGames || ((req, res) => res.json({ status: 'success', data: { games: [] } })));

// Progress & Achievements
router.get('/progress', studentController.getMyProgress || ((req, res) => res.json({ status: 'success', data: { progress: {} } })));
router.get('/achievements', studentController.getMyAchievements || ((req, res) => res.json({ status: 'success', data: { achievements: [] } })));

module.exports = router;
