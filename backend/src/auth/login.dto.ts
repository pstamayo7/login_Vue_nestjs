import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty()  // Esto permitirá que Swagger lo muestre
  @IsEmail()
  email: string;

  @ApiProperty()  // Esto permitirá que Swagger lo muestre
  @IsString()
  password: string;
}
