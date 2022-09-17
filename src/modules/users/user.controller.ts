import { Controller, NotFoundException, InternalServerErrorException, Get, Post, Body, ConflictException, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { NoUsersFoundException } from "./exceptions/no-users-found-exception";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UserDto } from "./dtos/user-dto";
import { EmailMustBeUniqueException } from "./exceptions/email-must-be-unique-exception";
import { CouldNotDeleteUserException } from "./exceptions/could-not-delete-user-exception";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (exception) {

      if (exception instanceof NoUsersFoundException) {
        throw new NotFoundException('No users could be found');
      } else {
        throw new InternalServerErrorException('Something went wrong on the server');
      }
    }
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (exception) {
      if (exception instanceof EmailMustBeUniqueException) {
        throw new ConflictException('Email is already taken');
      } else {
        throw new InternalServerErrorException('Something went wrong on the server');
      }
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.userService.getUserById(id);
    } catch (exception) {
      if (exception instanceof NoUsersFoundException) {
        throw new NotFoundException('Could not find the user with that given id');
      } else {
        throw new InternalServerErrorException('Something went wrong on the server');
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser(id);
    } catch (exception) {
      if (exception instanceof CouldNotDeleteUserException) {
        throw new NotFoundException('Could not find the user you are trying to delete');
      } else {
        throw new InternalServerErrorException('Something went wrong on the server');
      }
    }
  }
}