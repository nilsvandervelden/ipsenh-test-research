import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/modules/users/user.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { UserModule } from '../src/modules/users/user.module';
import { AppModule } from '../src/app.module';
import { configService } from '../src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../src/modules/users/user.service';
import { UserController } from '../src/modules/users/user.controller';

describe('User module test', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([
          UserEntity,
        ]),
      ],
      controllers: [UserController],
      providers: [UserService],
      // exports: [UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = await app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    afterAll(async () => {
      await Promise.all([
        app.close(),
      ])
    })
  });

  // TODO include test to ensure set requires functions
  it('Should get a empty array of users', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect(404);
  });

  // afterAll(async () => {
  //   await app.close();
  // });
});
