const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Class = require('../models/Class');
const Homework = require('../models/Homework');
const Announcement = require('../models/Announcement');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Dashboard Stats
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalStudents, totalTeachers, totalParents, totalClasses, totalHomework, recentUsers] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Parent.countDocuments(),
    Class.countDocuments(),
    Homework.countDocuments(),
    User.find().sort('-createdAt').limit(5).select('firstName lastName email role createdAt')
  ]);

  const stats = {
    totalStudents,
    totalTeachers,
    totalParents,
    totalClasses,
    totalHomework,
    totalUsers: totalStudents + totalTeachers + totalParents,
    recentUsers
  };

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Student Management
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find().populate('userId').populate('classId');

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students
    }
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
    // Ideally, we create a User first, then the Student profile linked to it
    // For simplicity here, we assume the User ID is passed or handled in a transaction
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        student: newStudent
      }
    });
});

// Teacher Management
exports.getAllTeachers = catchAsync(async (req, res, next) => {
    const teachers = await Teacher.find().populate('userId');
  
    res.status(200).json({
      status: 'success',
      results: teachers.length,
      data: {
        teachers
      }
    });
  });
  
exports.createTeacher = catchAsync(async (req, res, next) => {
    const newTeacher = await Teacher.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        teacher: newTeacher
      }
    });
});

// Class Management
exports.getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find().populate('teacherId');
  
    res.status(200).json({
      status: 'success',
      results: classes.length,
      data: {
        classes
      }
    });
  });
  
exports.createClass = catchAsync(async (req, res, next) => {
    const newClass = await Class.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        class: newClass
      }
    });
});

// Get single student
exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id)
    .populate('userId')
    .populate('classId');

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { student }
  });
});

// Update student
exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { student }
  });
});

// Delete student
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get single teacher
exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id).populate('userId');

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { teacher }
  });
});

// Update teacher
exports.updateTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { teacher }
  });
});

// Delete teacher
exports.deleteTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);

  if (!teacher) {
    return next(new AppError('No teacher found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Parent Management
exports.getAllParents = catchAsync(async (req, res, next) => {
  const parents = await Parent.find()
    .populate('userId')
    .populate('children');

  res.status(200).json({
    status: 'success',
    results: parents.length,
    data: { parents }
  });
});

exports.createParent = catchAsync(async (req, res, next) => {
  const newParent = await Parent.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { parent: newParent }
  });
});

exports.getParent = catchAsync(async (req, res, next) => {
  const parent = await Parent.findById(req.params.id)
    .populate('userId')
    .populate('children');

  if (!parent) {
    return next(new AppError('No parent found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { parent }
  });
});

exports.updateParent = catchAsync(async (req, res, next) => {
  const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!parent) {
    return next(new AppError('No parent found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { parent }
  });
});

exports.deleteParent = catchAsync(async (req, res, next) => {
  const parent = await Parent.findByIdAndDelete(req.params.id);

  if (!parent) {
    return next(new AppError('No parent found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get single class
exports.getClass = catchAsync(async (req, res, next) => {
  const classData = await Class.findById(req.params.id)
    .populate('teacherId')
    .populate('students');

  if (!classData) {
    return next(new AppError('No class found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { class: classData }
  });
});

// Update class
exports.updateClass = catchAsync(async (req, res, next) => {
  const classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!classData) {
    return next(new AppError('No class found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { class: classData }
  });
});

// Delete class
exports.deleteClass = catchAsync(async (req, res, next) => {
  const classData = await Class.findByIdAndDelete(req.params.id);

  if (!classData) {
    return next(new AppError('No class found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Homework Management
exports.getAllHomework = catchAsync(async (req, res, next) => {
  const homework = await Homework.find()
    .populate('teacherId', 'firstName lastName')
    .populate('classId', 'name grade')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: homework.length,
    data: { homework }
  });
});

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

// Announcement Management
exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
  const announcements = await Announcement.find()
    .populate('publishedBy', 'firstName lastName role')
    .sort('-publishedAt');

  res.status(200).json({
    status: 'success',
    results: announcements.length,
    data: { announcements }
  });
});

exports.createAnnouncement = catchAsync(async (req, res, next) => {
  const announcement = await Announcement.create({
    ...req.body,
    publishedBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: { announcement }
  });
});

exports.updateAnnouncement = catchAsync(async (req, res, next) => {
  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!announcement) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { announcement }
  });
});

exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!announcement) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
