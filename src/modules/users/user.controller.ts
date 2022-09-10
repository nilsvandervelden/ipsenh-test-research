import { Controller, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { UserService } from "./user.service";
import { NoUsersFoundException } from "./exceptions/no-users-found-exception";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

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
}