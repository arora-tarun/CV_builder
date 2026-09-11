import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contact: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
    },

    avatar :{
      type: String
    },

    googleId: {
      type: String,
      default: null,
    },

    facebookId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);


export const UserModel = mongoose.model("User", UserSchema);
