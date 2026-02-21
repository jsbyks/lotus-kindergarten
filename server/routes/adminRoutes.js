const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router
  .route('/users')
  .get(adminController.getAllUsers)
  .post(adminController.createUser);

router
  .route('/users/:id')
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

// Student Management
router
    .route('/students')
    .get(adminController.getAllStudents)
    .post(adminController.createStudent);

router
    .route('/students/:id')
    .get(adminController.getStudent)
    .patch(adminController.updateStudent)
    .delete(adminController.deleteStudent);

// Teacher Management
router
    .route('/teachers')
    .get(adminController.getAllTeachers)
    .post(adminController.createTeacher);

router
    .route('/teachers/:id')
    .get(adminController.getTeacher)
    .patch(adminController.updateTeacher)
    .delete(adminController.deleteTeacher);

// Parent Management
router
    .route('/parents')
    .get(adminController.getAllParents)
    .post(adminController.createParent);

router
    .route('/parents/:id')
    .get(adminController.getParent)
    .patch(adminController.updateParent)
    .delete(adminController.deleteParent);

// Class Management
router
    .route('/classes')
    .get(adminController.getAllClasses)
    .post(adminController.createClass);

router
    .route('/classes/:id')
    .get(adminController.getClass)
    .patch(adminController.updateClass)
    .delete(adminController.deleteClass);

// Homework Management (Admin can view/manage all homework)
router
    .route('/homework')
    .get(adminController.getAllHomework);

router
    .route('/homework/:id')
    .delete(adminController.deleteHomework);

// Announcement Management
router
    .route('/announcements')
    .get(adminController.getAllAnnouncements)
    .post(adminController.createAnnouncement);

router
    .route('/announcements/:id')
    .patch(adminController.updateAnnouncement)
    .delete(adminController.deleteAnnouncement);

module.exports = router;
