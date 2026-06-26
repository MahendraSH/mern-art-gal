const express = require('express');
const {
    Register,
    getAllUsers,
    getUserbyId,
    login,
    logout,
    getmyProfile,
    getAdminStats,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController.js');
const { isAutherizeduser, isAdmin } = require('../utils/auth.js');
const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(Register);
router.route('/me').get(isAutherizeduser, getmyProfile);
router.route('/logout').get(isAutherizeduser, logout);
router.route('/admin/stats').get(isAutherizeduser, isAdmin('admin'), getAdminStats);
router.route('/all').get(isAutherizeduser, isAdmin('admin'), getAllUsers);

router.route('/:id')
    .get(isAutherizeduser, isAdmin('admin'), getUserbyId)
    .put(isAutherizeduser, isAdmin('admin'), updateUserRole)
    .delete(isAutherizeduser, isAdmin('admin'), deleteUser);

module.exports = router;
