
const CatchAsycErrors = require('../middlewares/CatchAsyncErrors.js');
const User = require('../models/userModel.js');
const Galary = require('../models/GalaryModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');
const jwtcooki = require('../utils/Jwtcooki.js');
const cloudinary = require('cloudinary').v2;


//  login user 
const login = CatchAsycErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid email or password", 401));
    }
    jwtcooki(res, 200, user);

});

//  register user 
const Register = CatchAsycErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const cloudUpload = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "mern/avatars",
        width: 150,
        crop: "scale"

    });
    const user = await User.create({
        name,

        email,
        password,
        avatar: {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url
        }


    });
    
    jwtcooki(res, 201, user);

});

//  get all users 

const getAllUsers = CatchAsycErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({

        success: true,
        users

    });

});

//  get user by id
const getUserbyId = CatchAsycErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        user
    });
});


//  get user profile deails 
const getmyProfile = CatchAsycErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
        path: 'favorites',
        populate: {
            path: 'user',
            select: 'name avatar'
        }
    });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    
    // Fetch stats for this user
    const postsCount = await Galary.countDocuments({ user: req.user.id });
    const userPosts = await Galary.find({ user: req.user.id });
    let totalViews = 0;
    userPosts.forEach(post => {
        totalViews += post.reqTimes || 0;
    });

    res.status(200).json({
        success: true,
        user,
        stats: {
            postsCount,
            totalViews
        }
    });
});

//  logut 
const logout = CatchAsycErrors(async (req, res, next) => {
    res.cookie("loginToken", null, {
        expires: new Date(Date.now()), //current time cooki expire 

        httpOnly: true,
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
    });
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
});

// get admin stats -- Admin
const getAdminStats = CatchAsycErrors(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalPosts = await Galary.countDocuments();
    
    const posts = await Galary.find();
    let totalViews = 0;
    posts.forEach(post => {
        totalViews += post.reqTimes || 0;
    });

    res.status(200).json({
        success: true,
        stats: {
            totalUsers,
            totalAdmins,
            totalPosts,
            totalViews
        }
    });
});

// update User Role -- Admin
const updateUserRole = CatchAsycErrors(async (req, res, next) => {
    const newUserData = {
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user
    });
});

// Delete User -- Admin
const deleteUser = CatchAsycErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
    }

    // Delete user's posts from gallery
    await Galary.deleteMany({ user: req.params.id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports = {
    Register,
    getAllUsers,
    getUserbyId,
    login,
    getmyProfile,
    logout,
    getAdminStats,
    updateUserRole,
    deleteUser,
};



