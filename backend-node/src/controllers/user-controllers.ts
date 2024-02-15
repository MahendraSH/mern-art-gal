import ErrorHandler from "../utils/error-handler";

import { AsyncError } from "../middlewares/async-error-middleware";

import userModel, { UserDocument } from "../models/user-model";
import { NextFunction, Request, Response } from "express";
import jwtCookie from "../utils/jwt-cookie-maker";
import cloudinary from "cloudinary";

export const loginUser = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      password,
    }: { email: string | undefined; password: string | undefined } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("invalid email or password", 401));
    }
    jwtCookie(res, 200, user);
  }
);

export const registerUser = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      userName,
      email,
      password,
      avatar,
    }: {
      userName: string | undefined;
      email: string | undefined;
      password: string | undefined;
      avatar: string | undefined;
    } = req.body;

    let cloudUpload;
    if (avatar !== undefined) {
      cloudUpload = await cloudinary.v2.uploader.upload(avatar, {
        folder: "mern/avatars",
        width: 150,
        crop: "scale",
      });
    }

    const user = await userModel.create({
      userName,
      email,
      password,
      avatar: {
        public_id: cloudUpload?.public_id || undefined,
        url: cloudUpload?.secure_url || undefined,
      },
    });

    jwtCookie(res, 201, user);
  }
);

export const getAllUsers = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  }
);
export const getUserById = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const getProfileDetails = AsyncError(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const updateUserProfileDetails = AsyncError(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const { email, userName }: { email: string; userName: string } = req.body;

    user.email = email;
    user.userName = userName;

    user.save();

    res.status(201).json({
      success: true,
      message: "user details update successful ",
      user,
    });
  }
);

export const updateUserInfoById = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const { email, userName }: { email: string; userName: string } = req.body;

    user.email = email;
    user.userName = userName;

    user.save();

    res.status(201).json({
      success: true,
      message: "user details update successful ",
      user,
    });
  }
);

export const updateUserProfileImage = AsyncError(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const cloudUpload = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "mern/avatars",
      width: 150,
      crop: "scale",
    });
    // Delete the existing image from Cloudinary if it exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    user.avatar = {
      public_id: cloudUpload.public_id,
      url: cloudUpload.secure_url,
    };
    await user.save();
    res.status(200).json({
      success: true,
      message: "User image updated successfully",
      user,
    });
  }
);
export const deleteUserAccount = AsyncError(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    // Delete the user's image from Cloudinary if it exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    await user.deleteOne();
    // Clear the login token cookie
    res.clearCookie("loginToken", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  }
);

export const deleteUserById = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    // Delete the user's image from Cloudinary if it exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    await user.deleteOne();
    // Clear the login token cookie
    res.clearCookie("loginToken", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  }
);

export const logoutUser = AsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("loginToken", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ success: true, message: "logout successful " });
  }
);

//  to do update password
