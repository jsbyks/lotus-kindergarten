const Game = require('../models/Game');
const GameProgress = require('../models/GameProgress');
const Student = require('../models/Student');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all games
exports.getAllGames = catchAsync(async (req, res, next) => {
    const games = await Game.find({ isActive: true });

    res.status(200).json({
        status: 'success',
        results: games.length,
        data: {
            games
        }
    });
});

// Get games by grade
exports.getGamesByGrade = catchAsync(async (req, res, next) => {
    const { grade } = req.params;
    const games = await Game.find({
        forGrades: grade,
        isActive: true
    });

    res.status(200).json({
        status: 'success',
        results: games.length,
        data: {
            games
        }
    });
});

// Get game details
exports.getGameById = catchAsync(async (req, res, next) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        return next(new AppError('No game found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            game
        }
    });
});

// Create game (Admin only)
exports.createGame = catchAsync(async (req, res, next) => {
    const newGame = await Game.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            game: newGame
        }
    });
});

// Update game (Admin only)
exports.updateGame = catchAsync(async (req, res, next) => {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!game) {
        return next(new AppError('No game found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            game
        }
    });
});

// Record game play session
exports.recordGameSession = catchAsync(async (req, res, next) => {
    const { gameId } = req.params;
    const { studentId, score, level, timePlayed } = req.body;

    // Update game play count
    await Game.findByIdAndUpdate(gameId, { $inc: { playCount: 1 } });

    // Find or create game progress
    let progress = await GameProgress.findOne({ studentId, gameId });

    if (!progress) {
        progress = await GameProgress.create({
            studentId,
            gameId,
            sessionsPlayed: 1,
            totalTimePlayed: timePlayed,
            highScore: score,
            currentLevel: level,
            starsEarned: Math.floor(score / 10),
            history: [{
                playedAt: new Date(),
                score,
                level,
                timePlayed
            }]
        });
    } else {
        progress.sessionsPlayed += 1;
        progress.totalTimePlayed += timePlayed;
        if (score > progress.highScore) {
            progress.highScore = score;
        }
        if (level > progress.currentLevel) {
            progress.currentLevel = level;
        }
        progress.starsEarned += Math.floor(score / 10);
        progress.history.push({
            playedAt: new Date(),
            score,
            level,
            timePlayed
        });
        progress.lastPlayedAt = new Date();
        await progress.save();
    }

    // Update student's total stars
    await Student.findByIdAndUpdate(studentId, {
        $inc: { 'gameProgress.totalStars': Math.floor(score / 10) }
    });

    res.status(200).json({
        status: 'success',
        data: {
            progress
        }
    });
});

// Get student game progress
exports.getStudentProgress = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;

    const progress = await GameProgress.find({ studentId })
        .populate('gameId');

    res.status(200).json({
        status: 'success',
        results: progress.length,
        data: {
            progress
        }
    });
});

// Get game leaderboard
exports.getGameLeaderboard = catchAsync(async (req, res, next) => {
    const { gameId } = req.params;

    const leaderboard = await GameProgress.find({ gameId })
        .populate('studentId')
        .sort({ highScore: -1 })
        .limit(10);

    res.status(200).json({
        status: 'success',
        data: {
            leaderboard
        }
    });
});
