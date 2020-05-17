import { Document } from "mongoose";

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  // readonly accessToken: string;
  readonly profileImage: string;
  readonly createdAt: Date;
  readonly UpdateAt: Date;
}
