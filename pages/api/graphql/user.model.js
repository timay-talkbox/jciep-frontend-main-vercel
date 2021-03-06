import { model, models, Schema } from "mongoose";
import { districts, genders, identityTypes } from "./constants/enum";
import bcrypt from "bcrypt";
import { uuidv4 } from "../../../utils/uuid";

const emailVerifySchema = Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  meta: { type: Schema.Types.Mixed },
});

emailVerifySchema.pre("validate", async function (next) {
  this.token = uuidv4();
  next();
});

const phoneVerifySchema = Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  meta: { type: Schema.Types.Mixed },
});

phoneVerifySchema.pre("validate", async function (next) {
  if (this.isNew) {
    this.otp = Math.floor(Math.random() * 900000);
  }
  next();
});

const userSchema = Schema({
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  appleId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  identities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Identity",
    },
  ],
});

userSchema.statics.generateHash = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const identitySchema = Schema({
  type: {
    type: String,
    enum: Object.values(identityTypes),
    required: true,
  },
  chineseName: String,
  englishName: String,
  dob: Date,
  gender: {
    type: String,
    enum: Object.values(genders),
    required: true,
  },
  district: {
    type: String,
    enum: Object.values(districts),
  },
});

export const Identity = models["Identity"] ?? model("Identity", identitySchema);
export const User = models["User"] ?? model("User", userSchema);
export const EmailVerify =
  models["EmailVerify"] ?? model("EmailVerify", emailVerifySchema);
export const PhoneVerify =
  models["PhoneVerify"] ?? model("PhoneVerify", phoneVerifySchema);
