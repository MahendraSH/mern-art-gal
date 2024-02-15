import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/user-model";
import ErrorHandler from "./error-handler";
import { AsyncError } from "../middlewares/async-error-middleware";

export const isAdmin = AsyncError(
  async (
    req: Request & { user?: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const role = "admin";
    if (role !== req.user.role) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this route`,
          403
        )
      );
    }
    next();
  }
);
