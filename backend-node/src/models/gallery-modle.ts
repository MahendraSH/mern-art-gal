import { Document, Schema, Types, model } from "mongoose";
import { UserDocument } from "./user-model";

interface GalleryDocument extends Document {
  title: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  category: string;
  createdAt: Date;
  user: Types.ObjectId | UserDocument;
  views: {
    user: Types.ObjectId | UserDocument;
    date: Date;
    times: number;
  }[];
  reqTimes: number;
}

const gallerySchema: Schema<GalleryDocument> = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
    minLength: [4, "Title must be at least 4 characters long."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
    minLength: [20, "Description must be at least 20 characters long."],
  },
  image: {
    public_id: {
      type: String,
      required: [true, "Image public ID is required."],
    },
    url: {
      type: String,
      required: [true, "Image URL is required."],
    },
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  views: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Viewer user is required."],
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      times: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  reqTimes: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default model<GalleryDocument>("Gallery", gallerySchema);
