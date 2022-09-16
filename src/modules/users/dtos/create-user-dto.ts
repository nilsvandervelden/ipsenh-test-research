import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;
}
