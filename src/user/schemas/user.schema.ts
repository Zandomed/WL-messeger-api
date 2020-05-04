import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    // dateBirthday: { type: Date, required: true },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true },
);
