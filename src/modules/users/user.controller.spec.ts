import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { NoUsersFoundException } from './exceptions/no-users-found-exception';
import { UserController } from './user.controller';
import { UserDto } from './dtos/user-dto';
import { CreateUserDto } from './dtos/create-user-dto';
import { EmailMustBeUniqueException } from './exceptions/email-must-be-unique-exception';

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
    it("it calls the getAllUsers method", async () => {
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

  describe("Api createUser", () => {
    // it("it calls the createUser method", async () => {
    //   const createUserDto: CreateUserDto = {
    //     email: "test@test.nl"
    //   }

    //   const user: CreateUserDto = await userController.createUser(createUserDto);
    //   expect(user).toBeDefined();
    //   expect(user).toBeInstanceOf(CreateUserDto);
    //   expect(user.email).toEqual("test@test.nl");
    // })

    // it("if calling createUser and receive a specific error", async () => {
    //   jest.spyOn(userController, 'createUser').mockImplementation(() => {
    //     throw new EmailMustBeUniqueException("Email must be unique");
    //   });

    //   const createUserDto: CreateUserDto = {
    //     email: "test@test.nl"
    //   }
      
    //   try {
    //     // await userController.createUser(createUserDto);
    //     // await userController.createUser(createUserDto);
    //   }
    //   catch (err) {
    //     console.log(err)
    //     expect(err).toBeDefined();
    //     expect(err.message).toEqual("Email must be kekkie");
    //   }
    // });
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
