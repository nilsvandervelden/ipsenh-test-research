import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "./user.entity";
import { UserDto } from './dtos/user-dto';
import { NoUsersFoundException } from './exceptions/no-users-found-exception';
import { EmailMustBeUniqueException } from './exceptions/email-must-be-unique-exception';
import { CouldNotSaveUserException } from './exceptions/could-not-save-user-exception';
import { CreateUserDto } from './dtos/create-user-dto';
import { CouldNotDeleteUserException } from './exceptions/could-not-delete-user-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    //if there are no users return UserCouldNotBeFoundException
    if (users.length <= 0) {
      throw new NoUsersFoundException('No users could be found');
    }
    return this.userEntitiesToUserDTO(users);
  }
  
  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const emailAlreadyExists = await this.userRepository.findOne({
      where: {
        email: userDto.email,
      },
    });

    if(emailAlreadyExists) {
      throw new EmailMustBeUniqueException("Email must be unique");
    }

    const userEntity = new UserEntity();
    userEntity.email = userDto.email;

    try {
      await this.userRepository.save(userEntity);
    } catch(exception) {
      throw new CouldNotSaveUserException("Could not save user");
    }
    return this.userEntityToUserDTO(userEntity);
  }

  async getUserById(id: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userEntity) {
      throw new NoUsersFoundException(
        `Could not find a user with the id: ${id}`,
      );
    }
    return this.userEntityToUserDTO(userEntity);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const userToDelete = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      await this.userRepository.remove(userToDelete);
    } catch (ignored) {
      throw new CouldNotDeleteUserException(
        `Could not delete the user with id: ${id}`,
      );
    }
  }

  userEntitiesToUserDTO(userEntities: UserEntity[]): UserDto[] {
    const userDTOs: UserDto[] = [];
    for (const userEntity of userEntities) {
      userDTOs.push(this.userEntityToUserDTO(userEntity));
    }
    return userDTOs;
  }

  private userEntityToUserDTO(userEntity: UserEntity): UserDto {
    if (!userEntity) return;
    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }
}