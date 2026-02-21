const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route - get all active announcements
router.get('/public', announcementController.getAllAnnouncements);

// Protect all routes below
router.use(authController.protect);

// Get announcements for current user
router.get('/my-announcements', announcementController.getMyAnnouncements);

// Get single announcement
router.get('/:id', announcementController.getAnnouncement);

// Admin and Teacher can create announcements
router.post(
    '/',
    authController.restrictTo('admin', 'teacher'),
    announcementController.createAnnouncement
);

// Admin and Teacher can update/delete announcements
router.patch(
    '/:id',
    authController.restrictTo('admin', 'teacher'),
    announcementController.updateAnnouncement
);

router.delete(
    '/:id',
    authController.restrictTo('admin', 'teacher'),
    announcementController.deleteAnnouncement
);

// Admin and Teacher can pin/unpin announcements
router.patch(
    '/:id/toggle-pin',
    authController.restrictTo('admin', 'teacher'),
    announcementController.togglePinAnnouncement
);

module.exports = router;
