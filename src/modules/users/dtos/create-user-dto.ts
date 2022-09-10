import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Plain text password to to create the user with',
  })
  password: string;
}
