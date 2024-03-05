import { NextFunction, Request, Response } from "express";
import { AsyncError } from "../middlewares/async-error-middleware";
import blogPostModel, { Reaction } from "../models/blog-post-model";
import { UserDocument } from "../models/user-model";

export const CreateBlog = AsyncError(
  (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author } = req.body;
    const blogPost = blogPostModel.create({ title, content, author });
    res.status(201).json({
      succss: true,
      blog: blogPost,
    });
  },
);

export const update_blog_content_by_id = AsyncError(
  (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const updateBLog = blogPostModel.findByIdAndUpdate(
      { id },
      { title, content },
      {},
    );
    res.status(200).json({
      success: true,
      messsage: "Succesfully updated the blog ",
      blog: updateBLog,
    });
  },
);

export const add_reaction = AsyncError(
  (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction,
  ) => {
    const reaction: Reaction = req.body;
    const userId = req.user._id;
    const { id } = req.params;
  },
);
