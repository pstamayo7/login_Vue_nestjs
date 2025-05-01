import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  first_name: string;  // Añadir nombre

  @ApiProperty()
  @IsString()
  last_name: string;  // Añadir apellido

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
