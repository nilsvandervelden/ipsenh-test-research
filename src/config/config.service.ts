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
        host: 'localhost',
        port: '5432',
        username: 'postgres',
        password: 'password',
        database: 'default',
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['dist/migration/**/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: false,
        cli: {
          migrationsDir: 'src/migration',
        },
        ssl: false,
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
