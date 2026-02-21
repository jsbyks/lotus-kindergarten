const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Homework = require('../models/Homework');
const Submission = require('../models/Submission');
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Dashboard Stats
exports.getDashboardStats = catchAsync(async (req, res, next) => {
    const parent = await Parent.findOne({ userId: req.user.id })
        .populate({
            path: 'children',
            populate: {
                path: 'classId',
                select: 'className grade teacher'
            }
        });

    if (!parent) {
        return next(new AppError('Parent profile not found', 404));
    }

    // Get detailed information for each child
    const childrenDetails = await Promise.all(parent.children.map(async (child) => {
        // Get homework for this child's class
        const homework = await Homework.find({ classId: child.classId }).countDocuments();

        // Get pending homework (homework not yet submitted)
        const submissions = await Submission.find({ studentId: child._id });
        const submittedHomeworkIds = submissions.map(s => s.homeworkId.toString());
        const allHomework = await Homework.find({ classId: child.classId });
        const pendingHomework = allHomework.filter(hw => !submittedHomeworkIds.includes(hw._id.toString())).length;

        return {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
            dateOfBirth: child.dateOfBirth,
            class: child.class,
            className: child.classId?.className || 'Not assigned',
            grade: child.classId?.grade || 'N/A',
            totalHomework: homework,
            pendingHomework,
            completedHomework: submissions.length,
            medicalNotes: child.medicalNotes
        };
    }));

    const stats = {
        totalChildren: parent.children.length,
        children: childrenDetails,
        parentInfo: {
            firstName: parent.firstName,
            lastName: parent.lastName,
            email: parent.email,
            phone: parent.phone
        }
    };

    res.status(200).json({
        status: 'success',
        data: { stats }
    });
});

exports.getMyChildren = catchAsync(async (req, res, next) => {
    const parent = await Parent.findOne({ userId: req.user.id }).populate('children');
    if (!parent) {
        return next(new AppError('Parent profile not found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: parent.children.length,
        data: {
            children: parent.children
        }
    });
});

exports.getChildHomework = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    
    if (!student) {
        return next(new AppError('Student not found', 404));
    }

    // Verify this child belongs to the parent
    const parent = await Parent.findOne({ userId: req.user.id });
    if (!parent.children.includes(studentId)) {
        return next(new AppError('This student is not linked to your parent profile', 403));
    }

    // Find homework assigned to the student's class
    const homework = await Homework.find({ classId: student.classId });

    res.status(200).json({
        status: 'success',
        results: homework.length,
        data: {
            homework
        }
    });
});

// Get child attendance
exports.getChildAttendance = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if (!student) {
        return next(new AppError('Student not found', 404));
    }

    // Verify this child belongs to the parent
    const parent = await Parent.findOne({ userId: req.user.id });
    if (!parent.children.includes(studentId)) {
        return next(new AppError('This student is not linked to your parent profile', 403));
    }

    const { startDate, endDate } = req.query;
    const query = { classId: student.classId };

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(query).sort('-date');

    // Filter records to show only this student's attendance
    const studentAttendance = attendanceRecords.map(record => {
        const studentRecord = record.records.find(
            r => r.studentId.toString() === studentId
        );

        return {
            date: record.date,
            status: studentRecord ? studentRecord.status : 'absent',
            checkInTime: studentRecord?.checkInTime,
            checkOutTime: studentRecord?.checkOutTime,
            notes: studentRecord?.notes
        };
    });

    // Calculate stats
    let present = 0, absent = 0, late = 0, excused = 0;
    studentAttendance.forEach(record => {
        switch (record.status) {
            case 'present': present++; break;
            case 'absent': absent++; break;
            case 'late': late++; break;
            case 'excused': excused++; break;
        }
    });

    const total = studentAttendance.length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

    res.status(200).json({
        status: 'success',
        data: {
            records: studentAttendance,
            stats: {
                present,
                absent,
                late,
                excused,
                total,
                attendanceRate
            }
        }
    });
});
