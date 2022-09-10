import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Generated user ',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;
}
