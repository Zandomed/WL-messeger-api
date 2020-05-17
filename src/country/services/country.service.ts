import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../interfaces/country.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('countries') private readonly _countryModel: Model<Country>,
  ) {}

  public async findAll(): Promise<Country[]> {
    return await this._countryModel.find().sort('name');
  }

  public async findByID(_id: string): Promise<Country> {
    return await this._countryModel.findById(_id).catch(err => null);
  }
}
