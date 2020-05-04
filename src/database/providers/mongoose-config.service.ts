import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  /**
   * @override
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this._configService.get<string>('URL_MONGO'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
