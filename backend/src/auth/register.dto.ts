import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Min } from 'class-validator';


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

     @ApiPropertyOptional({
    description: 'ID del rol (por ejemplo, 1 para admin, 2 para user)',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  role_id?: number; // Cambiado de string a número

}
