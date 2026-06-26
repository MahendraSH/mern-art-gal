const express = require('express');
const { isAutherizeduser } = require('../utils/auth.js');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    toggleLikeBlog,
    addCommentBlog,
    deleteCommentBlog,
} = require('../controllers/BlogController.js');

router.route('/create').post(isAutherizeduser, createBlog);
router.route('/all').get(getAllBlogs);

router.route('/:id/like').put(isAutherizeduser, toggleLikeBlog);

router.route('/:id/comment')
    .post(isAutherizeduser, addCommentBlog)
    .delete(isAutherizeduser, deleteCommentBlog);

router.route('/:id')
    .get(getSingleBlog)
    .put(isAutherizeduser, updateBlog)
    .delete(isAutherizeduser, deleteBlog);

module.exports = router;
