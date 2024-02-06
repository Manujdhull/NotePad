import { registerAs } from '@nestjs/config';
import { join } from 'path';
const storageConfig = registerAs('filesystem', () => ({
  default: 'local',
  disks: {
    local: {
      driver: process.env.DRIVER,
      basePath: join(process.cwd(), 'storage'),
    },
  },
}));
export default storageConfig;
