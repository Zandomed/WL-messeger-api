import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly _userModel: Model<User>) {}

  /**
   * Get all Users
   * @name getUsers
   * @author Miguel Mendoza <miguelemrdev@gmail.com>
   */
  async getUsers(): Promise<User[]> {
    return await this._userModel.find();
  }

  // Get a single User
  async getUserByID(_id: string): Promise<User> {
    return await this._userModel.findById(_id).catch(err => null);
  }

  async findOne(params: Partial<User> | any): Promise<User> {
    return await this._userModel.findOne(params);
  }

  async findByEmail(email: string): Promise<User> {
    return await this._userModel.findOne({ email });
  }

  async createUser(createUserDTO: any): Promise<User> {
    const newUser = new this._userModel({
      ...createUserDTO,
      // password: passwordEncript
    });
    return await newUser.save();
  }
}
