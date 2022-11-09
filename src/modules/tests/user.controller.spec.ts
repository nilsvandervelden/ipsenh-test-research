import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { NoUsersFoundException } from '../users/exceptions/no-users-found-exception';
import { UserController } from '../users/user.controller';
import { UserDto } from '../users/dtos/user-dto';
import { CreateUserDto } from '../users/dtos/create-user-dto';
import { EmailMustBeUniqueException } from '../users/exceptions/email-must-be-unique-exception';
import { PerformanceService } from '../../performance.service';
import { CalculationService } from '../calculations/calculation.service';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;
  let performanceService: PerformanceService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        PerformanceService,
        {
          provide: UserService,
          useFactory: () => ({
            getAllUsers: jest.fn(() => Promise.resolve(USERS)),
            getUserById: jest.fn(() => Promise.resolve(USERS[0])),
          })
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userController = app.get<UserController>(UserController);
    performanceService = app.get<PerformanceService>(PerformanceService);

    performanceService.startAverageCPULoadMeasurement();
  });

  afterAll(() => {
    const averageCPULoad = performanceService.getAverageCPULoad();
    console.log(averageCPULoad);
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

  describe("Api getUsersById", () => {
    it("it calls the getUserById method", async () => {
      const user: UserDto = await userController.getUserById("a15b0f1e-fdb7-4b5f-afca-b644b3e8fcbf");
      expect(user.email).toEqual("test1@test.nl")
      expect(user.id).toEqual("a15b0f1e-fdb7-4b5f-afca-b644b3e8fcbf")
      expect(user).toBeDefined();
    })

    it("if calling getAllUsers and receive a specific error", async () => {
      jest.spyOn(userController, 'getUserById').mockImplementation(() => {
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

  it("if calling createUser and receive a specific error", async () => {
    const createUserDto = {
      email: "test@test.nl"
    } as CreateUserDto;

    jest.spyOn(userController, 'createUser').mockImplementation(() => {
      throw new EmailMustBeUniqueException("Email must be unique");
    });
    
    try {
      await userController.createUser(createUserDto);
    }
    catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toEqual("Email must be unique");
    }
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
