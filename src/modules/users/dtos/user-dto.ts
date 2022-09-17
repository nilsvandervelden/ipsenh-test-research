
import { IsEmail } from 'class-validator';

export class UserDto {
  id: string;

  @IsEmail()
  email: string;
}
