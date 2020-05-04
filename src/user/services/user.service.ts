import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../intefaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly _userModel: Model<IUser>) {}

  /**
   * Get all Users
   * @name getUsers
   * @author Miguel Mendoza <miguelemrdev@gmail.com>
   */
  async getUsers(): Promise<IUser[]> {
    return await this._userModel.find();
  }

  // Get a single User
  async getUserByID(userID: string): Promise<IUser> {
    return await this._userModel.findById({ _id: userID });
  }

  async findOne(params: Partial<IUser> | any): Promise<IUser> {
    return await this._userModel.findOne(params);
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this._userModel.findOne({ email });
  }

  async createUser(createUserDTO: any): Promise<IUser> {
    const newUser = new this._userModel({
      ...createUserDTO,
      // password: passwordEncript
    });
    return await newUser.save();
  }
}
