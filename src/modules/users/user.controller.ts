import { Controller, NotFoundException, InternalServerErrorException, Get, Post, Body, ConflictException } from "@nestjs/common";
import { UserService } from "./user.service";
import { NoUsersFoundException } from "./exceptions/no-users-found-exception";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UserDto } from "./dtos/user-dto";
import { EmailMustBeUniqueException } from "./exceptions/email-must-be-unique-exception";

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
      console.log(createUserDto);
      return await this.userService.createUser(createUserDto);
    } catch (exception) {
      console.log(exception);
      if (exception instanceof EmailMustBeUniqueException) {
        throw new ConflictException('Email is already taken');
      } else {
        throw new InternalServerErrorException('Something went wrong on the server');
      }
    }
  }
}