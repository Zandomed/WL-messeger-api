import { Document } from 'mongoose';
import { Country } from 'src/country/interfaces/country.interface';

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly birthday: Date;
  readonly images: string[];
  readonly country: Country;
  readonly createdAt: Date;
  readonly UpdateAt: Date;
}
