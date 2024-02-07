import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { models } from './models/application.model';

@Injectable()
export class DatabaseService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}
  public createSequelizeOptions() // connectionName?: string,
  : SequelizeModuleOptions | Promise<SequelizeModuleOptions> {
    // connectionName = connectionName || 'default';
    const config: SequelizeModuleOptions =
      this.configService.get<SequelizeModuleOptions>('databases.default');
    config.models = models;
    config.dialect = 'mysql';
    config.name = 'default';
    return config;
  }
}
