import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO } from '../dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly _userModel: Model<User>) {}

  /**
   * Get all Users
   * @name getUsers
   * @author Miguel Mendoza <miguelemrdev@gmail.com>
   */
  async findAll(): Promise<User[]> {
    return await this._userModel
      .find()
      .populate('country')
      .exec();
  }

  // Get a single User
  async findByID(_id: string): Promise<User> {
    return await this._userModel
      .findById(_id)
      .then(user => user.populate('country').execPopulate())
      .catch(err => null);
  }

  async findOne(params: Partial<User> | any): Promise<User> {
    return await this._userModel.findOne(params);
  }

  async findByEmail(email: string): Promise<User> {
    return await this._userModel.findOne({ email });
  }

  async create(createUserDTO: Partial<CreateUserDTO>): Promise<User> {
    const password = await hash(createUserDTO.password, 10);
    const newUser = new this._userModel({
      ...createUserDTO,
      password,
    });
    return await (await newUser.save()).populate('country').execPopulate();
  }
}
