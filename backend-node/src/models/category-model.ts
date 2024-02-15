import { Document, Schema, model } from "mongoose";

interface CategoryDocument extends Document {
  name: string;
  description: string;
  isBlog: boolean;
  isGallery: boolean;
}

const categorySchema: Schema<CategoryDocument> = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
  },
  isBlog: {
    type: Boolean,
    default: false,
  },
  isGallery: {
    type: Boolean,
    default: false,
  },
});

export default model<CategoryDocument>("Category", categorySchema);
