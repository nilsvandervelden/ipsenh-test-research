import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('PRODUCTION', false);
    return mode === 'true';
  }

  public getJWTKey() {
    return this.getValue('JWT_SECRET');
  }

  public getTypeOrmConfig(isRunningTests = false): TypeOrmModuleOptions {
    let defaultConfig = {
      type: 'postgres',
      name: 'default',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/**/*{.ts,.js}'],
      subscribers: [],
      synchronize: false,
      migrationsRun: false,
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: false,
    };

    const testConfig = {
      entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
      migrations: [
        'dist/migration/**/*{.ts,.js}',
        'src/migration/**/*{.ts,.js}',
      ],
      synchronize: isRunningTests,
      dropSchema: isRunningTests,
    };

    if (isRunningTests) {
      defaultConfig = { ...defaultConfig, ...testConfig };
    }

    return defaultConfig as TypeOrmModuleOptions;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'JWT_SECRET',
]);

export { configService };
