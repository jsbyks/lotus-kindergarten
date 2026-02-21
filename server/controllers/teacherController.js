const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Homework = require('../models/Homework');
const Submission = require('../models/Submission');
const Attendance = require('../models/Attendance');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Dashboard Stats
exports.getDashboardStats = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    // Get classes taught by this teacher
    const classes = await Class.find({ teacher: req.user.id }).populate('students');

    // Count total students across all classes
    const totalStudents = classes.reduce((sum, cls) => sum + (cls.students?.length || 0), 0);

    // Get homework created by this teacher
    const homework = await Homework.find({ teacherId: teacher._id });

    // Get pending submissions (submissions that need grading)
    const pendingSubmissions = await Submission.find({
        homeworkId: { $in: homework.map(hw => hw._id) },
        status: 'submitted'
    }).populate('studentId homeworkId');

    const stats = {
        totalClasses: classes.length,
        totalStudents,
        totalHomework: homework.length,
        pendingGrading: pendingSubmissions.length,
        classes: classes.map(cls => ({
            _id: cls._id,
            className: cls.className,
            grade: cls.grade,
            section: cls.section,
            studentCount: cls.students?.length || 0,
            classroom: cls.classroom
        })),
        pendingSubmissions: pendingSubmissions.slice(0, 10) // Latest 10
    };

    res.status(200).json({
        status: 'success',
        data: { stats }
    });
});

exports.getMyClasses = catchAsync(async (req, res, next) => {
    // Assuming req.user.id is the User ID, we need to find the Teacher profile
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const classes = await Class.find({ teacherId: teacher._id });

    res.status(200).json({
        status: 'success',
        results: classes.length,
        data: {
            classes
        }
    });
});

exports.getClassStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find({ classId: req.params.classId });

    res.status(200).json({
        status: 'success',
        results: students.length,
        data: {
            students
        }
    });
});

exports.createHomework = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const newHomework = await Homework.create({
        ...req.body,
        teacherId: teacher._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            homework: newHomework
        }
    });
});

exports.getHomework = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const homework = await Homework.find({ teacherId: teacher._id });

    res.status(200).json({
        status: 'success',
        results: homework.length,
        data: {
            homework
        }
    });
});

exports.gradeSubmission = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const { points, maxPoints, feedback, stars } = req.body;

    // Calculate percentage
    const percentage = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0;

    const submission = await Submission.findByIdAndUpdate(
        req.params.id,
        {
            status: 'graded',
            grade: {
                points,
                maxPoints,
                percentage,
                stars: stars || Math.min(5, Math.ceil(percentage / 20)),
                feedback,
                gradedBy: teacher._id,
                gradedAt: new Date()
            }
        },
        { new: true }
    ).populate('studentId homeworkId');

    if (!submission) {
        return next(new AppError('No submission found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            submission
        }
    });
});

// Get all submissions for a specific homework
exports.getHomeworkSubmissions = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const submissions = await Submission.find({
        homeworkId: req.params.homeworkId
    })
    .populate('studentId', 'firstName lastName studentId')
    .populate('homeworkId', 'title dueDate maxPoints')
    .sort('-submittedAt');

    res.status(200).json({
        status: 'success',
        results: submissions.length,
        data: {
            submissions
        }
    });
});

// Update homework
exports.updateHomework = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const homework = await Homework.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

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
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const homework = await Homework.findByIdAndDelete(req.params.id);

    if (!homework) {
        return next(new AppError('No homework found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Attendance Management
exports.markAttendance = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const { classId, date, records } = req.body;

    // Check if attendance already exists for this class and date
    const existingAttendance = await Attendance.findOne({
        classId,
        date: new Date(date).setHours(0, 0, 0, 0)
    });

    if (existingAttendance) {
        // Update existing attendance
        existingAttendance.records = records;
        existingAttendance.markedBy = teacher._id;
        await existingAttendance.save();

        return res.status(200).json({
            status: 'success',
            data: {
                attendance: existingAttendance
            }
        });
    }

    // Create new attendance record
    const attendance = await Attendance.create({
        classId,
        date: new Date(date).setHours(0, 0, 0, 0),
        records,
        markedBy: teacher._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            attendance
        }
    });
});

exports.getAttendance = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const { classId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { classId };

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
        .populate('records.studentId', 'firstName lastName studentId')
        .populate('markedBy', 'firstName lastName')
        .sort('-date');

    res.status(200).json({
        status: 'success',
        results: attendance.length,
        data: {
            attendance
        }
    });
});

// Get attendance statistics for a class
exports.getAttendanceStats = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
    }

    const { classId } = req.params;

    // Get all students in the class
    const classData = await Class.findById(classId).populate('students');
    if (!classData) {
        return next(new AppError('Class not found', 404));
    }

    // Get attendance records for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const attendanceRecords = await Attendance.find({
        classId,
        date: { $gte: thirtyDaysAgo }
    });

    // Calculate stats for each student
    const studentStats = classData.students.map(student => {
        let present = 0;
        let absent = 0;
        let late = 0;
        let excused = 0;

        attendanceRecords.forEach(record => {
            const studentRecord = record.records.find(
                r => r.studentId.toString() === student._id.toString()
            );

            if (studentRecord) {
                switch (studentRecord.status) {
                    case 'present':
                        present++;
                        break;
                    case 'absent':
                        absent++;
                        break;
                    case 'late':
                        late++;
                        break;
                    case 'excused':
                        excused++;
                        break;
                }
            }
        });

        const total = present + absent + late + excused;
        const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

        return {
            studentId: student._id,
            studentName: `${student.firstName} ${student.lastName}`,
            present,
            absent,
            late,
            excused,
            total,
            attendanceRate
        };
    });

    res.status(200).json({
        status: 'success',
        data: {
            stats: studentStats,
            totalDays: attendanceRecords.length
        }
    });
});
