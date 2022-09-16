import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { UserDto } from 'src/modules/users/dtos/user-dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { NoUsersFoundException } from './exceptions/no-users-found-exception';

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

  const USERS: UserEntity[] = [
    {
      "id": "3245dsfa",
      "email": "test1@test.nl",
    } as UserEntity,
    {
      "id": "3245dsfa",
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
        console.log(error)
        expect(error.message).toContain("No users could be found");
      }
    });
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
