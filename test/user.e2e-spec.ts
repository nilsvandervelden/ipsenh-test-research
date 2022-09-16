import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../src/modules/users/user.entity";
import { UserModule } from "../src/modules/users/user.module";
import { UserService } from "../src/modules/users/user.service";
import { Repository } from "typeorm";
import * as request from 'supertest'

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should get a empty array of users', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect(404)
  });
});