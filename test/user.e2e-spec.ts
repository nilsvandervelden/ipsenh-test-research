import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/modules/users/user.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { UserModule } from '../src/modules/users/user.module';
import { AppModule } from '../src/app.module';

describe('User module test', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    beforeAll(async () => {
      userRepository = await app.get<Repository<UserEntity>>(
        getRepositoryToken(UserEntity),
      );
    });
  });

  // TODO include test to ensure set requires functions
  it('/ (POST) Should create a user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@test.nl',
        password: 'password',
      })
      .expect({
        email: 'test@test.nl',
      })
      .expect(201);
  });

  // afterAll(async () => {
  //   await app.close();
  // });
});
