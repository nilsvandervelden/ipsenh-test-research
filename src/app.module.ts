import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/user.entity';
import { CalculationModule } from './modules/calculations/calculation.module';
import { PerformanceService } from './performance.service';

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
      entities: [UserEntity],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/**/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: false,
    }), 
    UserModule,
    CalculationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PerformanceService],
  exports: [PerformanceService]
})
export class AppModule {}
