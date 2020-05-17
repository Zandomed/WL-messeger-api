import { Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './services/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly _countryService: CountryService) {}

  @Get('/')
  public async getCountries() {
    return await this._countryService.findAll();
  }

  @Get('/:id')
  public async getCountry(@Param('id') _id: string) {
    return await this._countryService.getByID(_id);
  }
}
