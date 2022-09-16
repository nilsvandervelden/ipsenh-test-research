import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { NoUsersFoundException } from './exceptions/no-users-found-exception';
import { UserController } from './user.controller';
import { UserDto } from './dtos/user-dto';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({
            getAllUsers: jest.fn(() => Promise.resolve(USERS))
          })
        }
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userController = app.get<UserController>(UserController);
  });

  describe("Api getAllUsers", () => {
    it("it calling getAllUsers method", async () => {
      const users: UserDto[] = await userController.getAllUsers();
      expect(users).toBeDefined();
      expect(users.length).toEqual(2);
    })

    it("if calling getAllUsers and receive a specific error", async () => {
      jest.spyOn(userController, 'getAllUsers').mockImplementation(() => {
        throw new NoUsersFoundException('No users could be found');
      });
      
      try {
        await userController.getAllUsers();
      }
      catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual("No users could be found");
      }
    });
  });

  const USERS: UserEntity[] = [
    {
      "id": "a15b0f1e-fdb7-4b5f-afca-b644b3e8fcbf",
      "email": "test1@test.nl",
    } as UserEntity,
    {
      "id": "16d13faf-3036-433e-842e-be55e25acc27",
      "email": "test2@test.nl",
    } as UserEntity,
  ]

});
