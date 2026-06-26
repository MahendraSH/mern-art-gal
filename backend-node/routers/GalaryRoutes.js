const express = require('express');
const { isAutherizeduser, isAdmin } = require('../utils/auth.js');
const router = express.Router();
const { 
    createGalary, 
    getAllGalary, 
    getSingleGalary, 
    updateGalary, 
    deleteGalary, 
    getMyGalary,
    toggleLikeGalary,
    addCommentGalary,
    deleteCommentGalary,
    toggleFavoriteGalary,
} = require('../controllers/GalaryConroller.js');

router.route('/create').post(isAutherizeduser, createGalary);

router.route('/all').get(getAllGalary);

router.route('/me').get(isAutherizeduser, getMyGalary);

router.route('/:id/like').put(isAutherizeduser, toggleLikeGalary);
router.route('/:id/favorite').put(isAutherizeduser, toggleFavoriteGalary);

router.route('/:id/comment')
    .post(isAutherizeduser, addCommentGalary)
    .delete(isAutherizeduser, deleteCommentGalary);

router.route('/:id')
    .get(isAutherizeduser, getSingleGalary)
    .put(isAutherizeduser, updateGalary)
    .delete(isAutherizeduser, deleteGalary);

module.exports = router;
