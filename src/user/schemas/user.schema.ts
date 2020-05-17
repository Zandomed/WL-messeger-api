import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    country: { type: Schema.Types.ObjectId, required: true, ref: 'countries' },
    images: { type: Array, default: [] },
    gender: { type: String, required: true },
  },
  { timestamps: true },
);
