const Student = require('../models/Student');
const Homework = require('../models/Homework');
const Submission = require('../models/Submission');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getMyHomework = catchAsync(async (req, res, next) => {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
        return next(new AppError('Student profile not found', 404));
    }

    // Get all homework for the student's class
    const homework = await Homework.find({
        classId: student.classId,
        isPublished: true
    })
    .populate('teacherId', 'firstName lastName')
    .sort('-assignedDate');

    // Get all submissions by this student
    const submissions = await Submission.find({ studentId: student._id });
    const submissionMap = {};
    submissions.forEach(sub => {
        submissionMap[sub.homeworkId.toString()] = sub;
    });

    // Attach submission status to each homework
    const homeworkWithStatus = homework.map(hw => {
        const submission = submissionMap[hw._id.toString()];
        return {
            ...hw.toObject(),
            submissionStatus: submission ? submission.status : 'pending',
            submissionId: submission ? submission._id : null,
            grade: submission?.grade || null
        };
    });

    res.status(200).json({
        status: 'success',
        results: homeworkWithStatus.length,
        data: homeworkWithStatus
    });
});

exports.submitHomework = catchAsync(async (req, res, next) => {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
        return next(new AppError('Student profile not found', 404));
    }

    // Check if homework exists
    const homework = await Homework.findById(req.params.homeworkId);
    if (!homework) {
        return next(new AppError('Homework not found', 404));
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
        homeworkId: req.params.homeworkId,
        studentId: student._id
    });

    if (existingSubmission) {
        return next(new AppError('You have already submitted this homework', 400));
    }

    // Determine if submission is late
    const isLate = homework.dueDate && new Date() > new Date(homework.dueDate);

    const submission = await Submission.create({
        homeworkId: req.params.homeworkId,
        studentId: student._id,
        submittedBy: 'student',
        submitterId: req.user.id,
        status: isLate ? 'late' : 'submitted',
        ...req.body
    });

    res.status(201).json({
        status: 'success',
        data: {
            submission
        }
    });
});

// Get my submissions
exports.getMySubmissions = catchAsync(async (req, res, next) => {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
        return next(new AppError('Student profile not found', 404));
    }

    const submissions = await Submission.find({ studentId: student._id })
        .populate('homeworkId', 'title subject dueDate maxPoints')
        .sort('-submittedAt');

    res.status(200).json({
        status: 'success',
        results: submissions.length,
        data: {
            submissions
        }
    });
});
