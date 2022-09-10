import { configService } from './config/config.service';

const config = {
  ...configService.getTypeOrmConfig(),
};

export default config;
