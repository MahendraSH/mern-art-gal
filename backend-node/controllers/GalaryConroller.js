
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
    const galary = await Galary.findById(req.params.id);
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
    res.status(200).json({
        success: true,
        galary,
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

module.exports = {
    createGalary,
    getAllGalary,
    getSingleGalary,
    updateGalary,
    deleteGalary,
    getMyGalary,
};