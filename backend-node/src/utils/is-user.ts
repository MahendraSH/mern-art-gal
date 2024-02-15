import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AsyncError } from "../middlewares/async-error-middleware";
import userModel, { UserDocument } from "../models/user-model";
import ErrorHandler from "./error-handler";
export const isUser = AsyncError(
  async (
    req: Request & { user?: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const { loginToken } = req.cookies;
    if (!loginToken) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }
    const decodeData: any = verify(loginToken, process.env.JWT_SECRET);

    const user = await userModel.findById(decodeData.id);
    if (!user) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }
    req.user = user;

    next();
  }
);
