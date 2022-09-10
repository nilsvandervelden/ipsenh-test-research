import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "./user.entity";
import { UserDto } from './dtos/user-dto';
import { NoUsersFoundException } from './exceptions/no-users-found-exception';

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