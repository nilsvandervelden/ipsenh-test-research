import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/modules/users/user.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { UserModule } from '../src/modules/users/user.module';
import { AppModule } from '../src/app.module';
import { configService } from '../src/config/config.service';
import { UserService } from '../src/modules/users/user.service';
import { UserController } from '../src/modules/users/user.controller';
import { UserDto } from 'src/modules/users/dtos/user-dto';

describe('User module test', () => {
  let app: INestApplication;
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  const USERS: UserDto[] = [
    {
      "id": "3245dsfa",
      "email": "test1@test.nl",
    },
    {
      "id": "3245dsfa",
      "email": "test2@test.nl",
    },
  ]

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe("Method findAll", () => {
    it('it should return 2 users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(USERS);
      const result = await userService.getAllUsers();
      expect(result.length).toEqual(2);
    });

    // it('it must generate an error, findAll return an error', async () => {
    //   jest.spyOn(inventoryItemsRepository, 'find').mockImplementation(() => { throw new Error('async error') });
    //   try {
    //     await service.findAll();
    //   }
    //   catch (err) {
    //     expect(err.message).toContain("findAll error: async error");
    //   }
    // });
  });

  // it('Should get a empty array of users', () => {
  //   await request(app.getHttpServer())
  //     .get('/users')
  //     .expect(404);
  // });

  // afterAll(async () => {
  //   await app.close();
  // });
});
