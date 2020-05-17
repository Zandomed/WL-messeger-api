import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let provider: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService],
    }).compile();

    provider = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
