import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models/application.model';

export const modelProviders = SequelizeModule.forFeature([...models]);
