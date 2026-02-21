const express = require('express');
const gameController = require('../controllers/gameController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes - anyone can view games
router
    .route('/')
    .get(gameController.getAllGames);

router
    .route('/grade/:grade')
    .get(gameController.getGamesByGrade);

router
    .route('/:id')
    .get(gameController.getGameById);

// Protected routes
router.use(authController.protect);

// Admin only
router
    .route('/')
    .post(authController.restrictTo('admin'), gameController.createGame);

router
    .route('/:id')
    .patch(authController.restrictTo('admin'), gameController.updateGame);

// Game play
router
    .route('/:gameId/play')
    .post(authController.restrictTo('student', 'parent'), gameController.recordGameSession);

router
    .route('/:gameId/leaderboard')
    .get(gameController.getGameLeaderboard);

router
    .route('/progress/:studentId')
    .get(authController.restrictTo('student', 'parent', 'teacher', 'admin'), gameController.getStudentProgress);

module.exports = router;
