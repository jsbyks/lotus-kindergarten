const Announcement = require('../models/Announcement');
const Student = require('../models/Student');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create announcement (Admin/Teacher)
exports.createAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.create({
        ...req.body,
        publishedBy: req.user.id
    });

    res.status(201).json({
        status: 'success',
        data: {
            announcement
        }
    });
});

// Get all announcements with filtering
exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
    const query = { isActive: true };

    // Filter by type
    if (req.query.type) {
        query.type = req.query.type;
    }

    // Filter by target audience
    if (req.query.audience) {
        query.targetAudience = { $in: [req.query.audience, 'all'] };
    }

    // Only show non-expired announcements
    query.$or = [
        { expiresAt: { $exists: false } },
        { expiresAt: null },
        { expiresAt: { $gte: new Date() } }
    ];

    const announcements = await Announcement.find(query)
        .populate('publishedBy', 'firstName lastName role')
        .sort({ isPinned: -1, publishedAt: -1 });

    res.status(200).json({
        status: 'success',
        results: announcements.length,
        data: {
            announcements
        }
    });
});

// Get announcements for specific user based on role
exports.getMyAnnouncements = catchAsync(async (req, res, next) => {
    const userRole = req.user.role;
    let targetAudiences = ['all'];

    if (userRole === 'teacher') {
        targetAudiences.push('teachers');
    } else if (userRole === 'parent') {
        targetAudiences.push('parents');

        // Also include announcements for children's grades
        // This would require fetching parent's children and their grades
    } else if (userRole === 'student') {
        // Get student's grade
        const student = await Student.findOne({ userId: req.user.id });
        if (student) {
            targetAudiences.push(student.class); // e.g., 'pre-k', 'kg1', 'kg2'
        }
    }

    const announcements = await Announcement.find({
        isActive: true,
        targetAudience: { $in: targetAudiences },
        $or: [
            { expiresAt: { $exists: false } },
            { expiresAt: null },
            { expiresAt: { $gte: new Date() } }
        ]
    })
    .populate('publishedBy', 'firstName lastName role')
    .sort({ isPinned: -1, publishedAt: -1 })
    .limit(20);

    res.status(200).json({
        status: 'success',
        results: announcements.length,
        data: {
            announcements
        }
    });
});

// Get single announcement
exports.getAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id)
        .populate('publishedBy', 'firstName lastName role');

    if (!announcement) {
        return next(new AppError('Announcement not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            announcement
        }
    });
});

// Update announcement
exports.updateAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!announcement) {
        return next(new AppError('Announcement not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            announcement
        }
    });
});

// Delete announcement (soft delete by setting isActive to false)
exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
    );

    if (!announcement) {
        return next(new AppError('Announcement not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Pin/Unpin announcement
exports.togglePinAnnouncement = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        return next(new AppError('Announcement not found', 404));
    }

    announcement.isPinned = !announcement.isPinned;
    await announcement.save();

    res.status(200).json({
        status: 'success',
        data: {
            announcement
        }
    });
});
