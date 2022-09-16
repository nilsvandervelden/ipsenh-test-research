import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }), 
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
