import { Request, Response, NextFunction, RequestHandler } from "express";

export const AsyncError =
  (fn: Function): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
