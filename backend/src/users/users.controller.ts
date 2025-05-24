import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/register.dto'; // Asegúrate de que esté bien importado
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users/register
  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.usersService.create(userDto);
  }

  // GET /users/me (requiere token válido)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
