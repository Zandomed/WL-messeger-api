import { Schema } from 'mongoose';

export const CountrySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true },
);
