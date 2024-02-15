import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: "user" | "admin";
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJwtToken(): string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your name."],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      validate: {
        validator: function (value: string) {
          return (
            value.length >= 6 &&
            validator.isStrongPassword(value, {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            })
          );
        },
        message:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      },
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare user password for login
userSchema.methods.comparePassword = async function (
  this: UserDocument,
  enteredPassword: string
) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("An error occurred while comparing passwords.");
  }
};

// JWT token generation
userSchema.methods.getJwtToken = function (this: UserDocument) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export default model<UserDocument>("User", userSchema);
