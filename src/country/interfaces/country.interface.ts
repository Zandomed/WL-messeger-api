import { Document } from 'mongoose';

export interface Country extends Document {
  readonly _id: string;
  readonly name: string;
  readonly code: string;
}
