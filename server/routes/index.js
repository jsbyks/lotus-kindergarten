const express = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const teacherRoutes = require('./teacherRoutes');
const parentRoutes = require('./parentRoutes');
const studentRoutes = require('./studentRoutes');
const homeworkRoutes = require('./homeworkRoutes');
const gameRoutes = require('./gameRoutes');
const announcementRoutes = require('./announcementRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/teacher', teacherRoutes);
router.use('/parent', parentRoutes);
router.use('/student', studentRoutes);
router.use('/homework', homeworkRoutes);
router.use('/games', gameRoutes);
router.use('/announcements', announcementRoutes);

module.exports = router;
