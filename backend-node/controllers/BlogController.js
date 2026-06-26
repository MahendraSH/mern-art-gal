const CatchAsycErrors = require('../middlewares/CatchAsyncErrors.js');
const Blog = require('../models/BlogModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');
const cloudinary = require('cloudinary').v2;

// Create Blog
const createBlog = CatchAsycErrors(async (req, res, next) => {
    const { title, content, category } = req.body;
    const _id = req.user._id;

    if (!req.body.file) {
        return next(new ErrorHandler("Please upload an image for the blog post", 400));
    }

    const cloudUpload = await cloudinary.uploader.upload(req.body.file, {
        folder: "mern/blogs",
        width: 600,
        crop: "scale"
    });

    const newBlog = await Blog.create({
        title,
        content,
        category: category || "Art Guide",
        image: {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url,
        },
        user: _id,
    });

    res.status(201).json({
        success: true,
        newBlog,
        message: "Blog post created successfully",
    });
});

// Get All Blogs
const getAllBlogs = CatchAsycErrors(async (req, res, next) => {
    const blogs = await Blog.find()
        .populate("user", "name avatar")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        blogs,
    });
});

// Get Single Blog Details
const getSingleBlog = CatchAsycErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
        .populate("user", "name avatar")
        .populate("comments.user", "name avatar");

    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    });
});

// Update Blog
const updateBlog = CatchAsycErrors(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    // Authorization check
    if (blog.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to update this article", 403));
    }

    const { title, content, category } = req.body;
    const updateData = { title, content, category };

    if (req.body.file) {
        // Delete old image
        await cloudinary.uploader.destroy(blog.image.public_id);
        // Upload new image
        const cloudUpload = await cloudinary.uploader.upload(req.body.file, {
            folder: "mern/blogs",
            width: 600,
            crop: "scale"
        });
        updateData.image = {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url
        };
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        blog,
        message: "Blog post updated successfully",
    });
});

// Delete Blog
const deleteBlog = CatchAsycErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    // Authorization check
    if (blog.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to delete this article", 403));
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(blog.image.public_id);

    // Delete blog
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Blog post deleted successfully",
    });
});

// Toggle Like on Blog
const toggleLikeBlog = CatchAsycErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    const userId = req.user._id;
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
        blog.likes.pull(userId);
    } else {
        blog.likes.push(userId);
    }

    await blog.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: isLiked ? "Unliked article" : "Liked article",
        likes: blog.likes,
    });
});

// Add Comment to Blog
const addCommentBlog = CatchAsycErrors(async (req, res, next) => {
    const { text } = req.body;
    if (!text) {
        return next(new ErrorHandler("Comment text is required", 400));
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    blog.comments.push({
        user: req.user._id,
        text,
    });

    await blog.save({ validateBeforeSave: false });

    const updatedBlog = await Blog.findById(req.params.id).populate("comments.user", "name avatar");

    res.status(200).json({
        success: true,
        message: "Comment added successfully",
        comments: updatedBlog.comments,
    });
});

// Delete Comment from Blog
const deleteCommentBlog = CatchAsycErrors(async (req, res, next) => {
    const { commentId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 404));
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to delete this comment", 403));
    }

    blog.comments.pull(commentId);
    await blog.save({ validateBeforeSave: false });

    const updatedBlog = await Blog.findById(req.params.id).populate("comments.user", "name avatar");

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
        comments: updatedBlog.comments,
    });
});

module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    toggleLikeBlog,
    addCommentBlog,
    deleteCommentBlog,
};
