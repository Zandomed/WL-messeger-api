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
  public async findAll(): Promise<User[]> {
    return await this._userModel
      .find()
      .populate('country')
      .exec();
  }

  // Get a single User
  public async findByID(_id: string): Promise<User> {
    return await this._userModel
      .findById(_id)
      .then(user => user.populate('country').execPopulate())
      .catch(err => null);
  }

  public async findOne(params: Partial<User> | any): Promise<User> {
    return await this._userModel
      .findOne(params)
      .then(user => user.populate('country').execPopulate())
      .catch(err => null);
  }

  public async isExistEmail(email: string): Promise<boolean> {
    const regex = new RegExp(['^', email, '$'].join(''), 'i');
    const user = await this.findOne({ email: regex });
    if (user) return true;
    else return false;
  }

  public async isExistUsername(username: string): Promise<boolean> {
    const regex = new RegExp(['^', username, '$'].join(''), 'i');
    const user = await this.findOne({
      username: regex,
    });
    if (user) return true;
    else return false;
  }

  public async create(createUserDTO: Partial<CreateUserDTO>): Promise<User> {
    const password = await hash(createUserDTO.password, 10);
    const newUser = new this._userModel({
      ...createUserDTO,
      password,
    });
    return await (await newUser.save()).populate('country').execPopulate();
  }
}
