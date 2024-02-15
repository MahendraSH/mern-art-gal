import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-handler";

const errorController = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const duplicatedKey = Object.keys(err.keyValue)[0];
    const message = `Duplicate ${duplicatedKey} entered.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error: err.stack || "No stack trace available",
  });
};

export default errorController;
