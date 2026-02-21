const Homework = require('../models/Homework');
const Submission = require('../models/Submission');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create homework
exports.createHomework = catchAsync(async (req, res, next) => {
    // Get teacher profile
    const teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    // Create homework with teacher ID
    const homework = await Homework.create({
        ...req.body,
        teacherId: teacher._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            homework
        }
    });
});

// Get all homework
exports.getAllHomework = catchAsync(async (req, res, next) => {
    const homework = await Homework.find()
        .populate('teacherId')
        .populate('classId');

    res.status(200).json({
        status: 'success',
        results: homework.length,
        data: {
            homework
        }
    });
});

// Get homework by ID
exports.getHomeworkById = catchAsync(async (req, res, next) => {
    const homework = await Homework.findById(req.params.id)
        .populate('teacherId')
        .populate('classId')
        .populate('submissions');

    if (!homework) {
        return next(new AppError('No homework found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            homework
        }
    });
});

// Update homework
exports.updateHomework = catchAsync(async (req, res, next) => {
    const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!homework) {
        return next(new AppError('No homework found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            homework
        }
    });
});

// Delete homework
exports.deleteHomework = catchAsync(async (req, res, next) => {
    const homework = await Homework.findByIdAndDelete(req.params.id);

    if (!homework) {
        return next(new AppError('No homework found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Submit homework
exports.submitHomework = catchAsync(async (req, res, next) => {
    const homework = await Homework.findById(req.params.homeworkId);

    if (!homework) {
        return next(new AppError('No homework found with that ID', 404));
    }

    const submission = await Submission.create({
        homeworkId: req.params.homeworkId,
        studentId: req.body.studentId,
        submittedBy: req.body.submittedBy || 'student',
        submitterId: req.user.id,
        attachments: req.body.attachments,
        textResponse: req.body.textResponse,
        submittedAt: new Date(),
        status: new Date() > homework.dueDate ? 'late' : 'submitted'
    });

    // Add submission to homework
    homework.submissions.push(submission._id);
    await homework.save();

    res.status(201).json({
        status: 'success',
        data: {
            submission
        }
    });
});

// Get submissions for homework
exports.getSubmissions = catchAsync(async (req, res, next) => {
    const submissions = await Submission.find({ homeworkId: req.params.homeworkId })
        .populate('studentId')
        .populate('homeworkId');

    res.status(200).json({
        status: 'success',
        results: submissions.length,
        data: {
            submissions
        }
    });
});
