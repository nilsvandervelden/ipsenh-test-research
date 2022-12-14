import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { NoUsersFoundException } from '../users/exceptions/no-users-found-exception';
import { PerformanceService } from '../../performance.service';
import { CalculationService } from '../calculations/calculation.service';
import { performance } from 'perf_hooks';

describe('UserService', () => {
  let startTime;
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let performanceService: PerformanceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PerformanceService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    performanceService = module.get<PerformanceService>(PerformanceService);

    performanceService.startAverageCPULoadMeasurement();
    startTime = performance.now();
  });

  afterAll(() => {
    const averageCPULoad = performanceService.getAverageCPULoad();
    const endTime = performance.now();
    console.log('_____________User.Service_____________ ');
    console.log('Test duration: ');
    console.log(endTime - startTime);
    console.log('Average cpu load: ');
    console.log(averageCPULoad);
  })

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

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe("Method getAll users", () => {

    it('it should return 2 users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(USERS);
      const result = await userService.getAllUsers();
      expect(result.length).toEqual(2);
    });

    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(userRepository, 'find').mockImplementation(() => { 
        throw new NoUsersFoundException('No users could be found');
      });
      try {
        await userService.getAllUsers();
      }
      catch (error) {
        expect(error.message).toContain("No users could be found");
      }
    });
  });

  describe("Method getUserById users", () => {
    it('it should return 1 user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(USERS[0]);
      const result = await userService.getUserById("a15b0f1e-fdb7-4b5f-afca-b644b3e8fcbf");
      expect(result.email).toEqual("test1@test.nl");
    });

    it('it must generate an error, findOne return an error', async () => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => { 
        throw new NoUsersFoundException('No users could be found');
      });
      try {
        await userService.getUserById("a12b0f1e-fdb7-4b5f-afca-b644b3e8fcbf");
      }
      catch (error) {
        expect(error.message).toContain("No users could be found");
      }
    });
  });
});
