import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CountryService } from './services/country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly _countryService: CountryService) {}

  @Get('/')
  public async getCountries() {
    return await this._countryService.findAll();
  }

  @Get('/:id')
  public async getCountry(@Param('id') _id: string) {
    const country = await this._countryService.findByID(_id);
    if (!country) throw new NotFoundException(`Not found country by ID: ${_id}`);
   return country;
  }
}
