import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../src/modules/users/user.entity";
import { UserModule } from "../src/modules/users/user.module";
import { UserService } from "../src/modules/users/user.service";
import { getConnection, Repository } from "typeorm";
import * as request from 'supertest'
import { response } from "express";

describe('UserController (e2e)', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          name: 'default',
          host: 'localhost',
          port: '5432',
          username: 'postgres',
          password: 'password',
          database: 'default',
          entities: [UserEntity],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userRepository = moduleFixture.get(UserModule);
    userService = new UserService(userRepository);
    await getConnection().getRepository(UserEntity).clear(); // Get repository

  });

  afterAll(async () => {
    // await getConnection().getRepository(UserEntity).query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    // await getConnection().getRepository(UserEntity).clear(); // Get repository
    await getConnection().dropDatabase();
    await app.close();
  });

  it('should_returnANotFoundException_when_getAllUsersIsCalledWhileNoUsersExist', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect({
        statusCode: 404,
        message: 'No users could be found',
        error: 'Not Found'
      })
      .expect(404)
  });

  it('should_returnTheCreatedUser_when_createUserIsCalledWithAValidEmail', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: "test@test.nl"
      })
      .expect({
        id: 1,
        email: "test@test.nl"
      })
      .expect(201)
  });

  it('should_throwAConflictException_when_createUserIsCalledWithAnEmailThatHasAlreadyBeenTaken', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: "test@test.nl"
      })
      .expect({
        statusCode: 409,
        message: 'Email is already taken',
        error: 'Conflict'
      })
      .expect(409)
  });

  it('should_returnAnArrayOfUsers_when_getAllUsersIsCalledWhileUsersExist', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect([ { id: 1, email: 'test@test.nl' } ])
      .expect(200)
  });
});