
const CatchAsycErrors = require('../middlewares/CatchAsyncErrors.js');
const User = require('../models/userModel.js');
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
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

//  logut 
const logout = CatchAsycErrors(async (req, res, next) => {
    res.cookie("loginToken", null, {
        expires: new Date(Date.now()), //current time cooki expire 

        httpOnly: true, httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
    });
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
});


module.exports = { Register, getAllUsers, getUserbyId, login, getmyProfile, logout };



