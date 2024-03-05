import { Document, Schema, Types, model } from "mongoose";
import { UserDocument } from "./user-model";

export interface Reaction {
  type:
    | "thumbsUp"
    | "thumbsDown"
    | "heart"
    | "star"
    | "applause"
    | "laugh"
    | "surprised"
    | "love";
  emoji: "👍" | "👎" | "❤️" | "⭐️" | "👏" | "😂" | "😲" | "💖";
  count: number; // Number of times the reaction has been received
}

export interface BlogPostDocument extends Document {
  title: string;
  content: string;
  author: Types.ObjectId | UserDocument;
  createdAt: Date;
  updatedAt: Date;
  reactions: Reaction[];
}

const blogPostSchema: Schema<BlogPostDocument> = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
    minLength: [4, "Title must be at least 4 characters long."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reactions: [
    {
      type: {
        type: String,
        required: true,
      },
      emoji: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

export default model<BlogPostDocument>("BlogPost", blogPostSchema);
