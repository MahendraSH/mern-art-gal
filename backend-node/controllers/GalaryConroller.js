
const CatchAsycErrors = require('../middlewares/CatchAsyncErrors.js');
const Galary = require('../models/GalaryModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');
const jwtcooki = require('../utils/Jwtcooki.js');
const cloudinary = require('cloudinary').v2;

//  create galary 
const createGalary = CatchAsycErrors(async (req, res, next) => {
    const { title, discription, category } = req.body;
    const _id = req.user._id;
    const cloudUpload = await cloudinary.uploader.upload(req.body.file, {
        folder: "mern/post",
        width: 150,
        crop: "scale"

    });

    const newGalary = await Galary.create({
        title,
        discription,
        image: {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url,
        },
        category: category || "Digital Art",

        user: _id,
        createdAt: Date.now(),
    });
    res.status(201).json({
        success: true,
        newGalary,
        message: "galary created successfully",
    });

});

//  get all galary

const getAllGalary = CatchAsycErrors(async (req, res, next) => {
    const galary = await Galary.find().populate("user", "name avatar");
    res.status(200).json({
        success: true,
        galary,
    });
});

//   get single galary

const getSingleGalary = CatchAsycErrors(async (req, res, next) => {
    const galary = await Galary.findById(req.params.id)
        .populate("user", "name avatar")
        .populate("comments.user", "name avatar");
        
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }
    const userId = req.user._id;
    const viewIndex = galary.views.findIndex(
        (view) => view.user.toString() === userId.toString()
    );

    if (viewIndex !== -1) {
        galary.views[viewIndex].times += 1;
    } else {
        galary.views.push({ user: userId, date: Date.now(), times: 1 });
    }

    galary.reqTimes += 1;
    await galary.save({ validateBeforeSave: false });
    
    const User = require('../models/userModel.js');
    const user = await User.findById(req.user._id);
    const isSaved = user ? user.favorites.includes(galary._id) : false;

    res.status(200).json({
        success: true,
        galary,
        isSaved
    });
});


//  update galary

const updateGalary = CatchAsycErrors(async (req, res, next) => {
    let galary = await Galary.findById(req.params.id);
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }
    // Check if the user is the owner or an admin
    if (galary.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to update this post", 403));
    }
    galary = await Galary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        galary,
        message: "galary updated successfully",
    });
});

// delete galary

const deleteGalary = CatchAsycErrors(async (req, res, next) => {
    const galary = await Galary.findById(req.params.id);
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }
    // Check if the user is the owner or an admin
    if (galary.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to delete this post", 403));
    }
    await Galary.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "galary deleted successfully",
    });
});

// get my galary (posts uploaded by logged-in user)
const getMyGalary = CatchAsycErrors(async (req, res, next) => {
    const galary = await Galary.find({ user: req.user._id }).populate("user", "name avatar");
    res.status(200).json({
        success: true,
        galary,
    });
});

// Toggle Like Gallery
const toggleLikeGalary = CatchAsycErrors(async (req, res, next) => {
    const galary = await Galary.findById(req.params.id);
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }

    const userId = req.user._id;
    const isLiked = galary.likes.includes(userId);

    if (isLiked) {
        galary.likes.pull(userId);
    } else {
        galary.likes.push(userId);
    }

    await galary.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: isLiked ? "Unliked artwork" : "Liked artwork",
        likes: galary.likes,
    });
});

// Add Comment to Gallery
const addCommentGalary = CatchAsycErrors(async (req, res, next) => {
    const { text } = req.body;
    if (!text) {
        return next(new ErrorHandler("Comment text is required", 400));
    }

    const galary = await Galary.findById(req.params.id);
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }

    galary.comments.push({
        user: req.user._id,
        text,
    });

    await galary.save({ validateBeforeSave: false });

    const updatedGalary = await Galary.findById(req.params.id).populate("comments.user", "name avatar");

    res.status(200).json({
        success: true,
        message: "Comment added successfully",
        comments: updatedGalary.comments,
    });
});

// Delete Comment from Gallery
const deleteCommentGalary = CatchAsycErrors(async (req, res, next) => {
    const { commentId } = req.body;
    const galary = await Galary.findById(req.params.id);
    if (!galary) {
        return next(new ErrorHandler("galary not found", 404));
    }

    const comment = galary.comments.id(commentId);
    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to delete this comment", 403));
    }

    galary.comments.pull(commentId);
    await galary.save({ validateBeforeSave: false });

    const updatedGalary = await Galary.findById(req.params.id).populate("comments.user", "name avatar");

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
        comments: updatedGalary.comments,
    });
});

// Toggle Favorite Artwork
const toggleFavoriteGalary = CatchAsycErrors(async (req, res, next) => {
    const User = require('../models/userModel.js');
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const galaryId = req.params.id;
    const isFavorited = user.favorites.includes(galaryId);

    if (isFavorited) {
        user.favorites.pull(galaryId);
    } else {
        user.favorites.push(galaryId);
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: isFavorited ? "Removed from saved artworks" : "Saved to your favorites",
        favorites: user.favorites,
    });
});

module.exports = {
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
};