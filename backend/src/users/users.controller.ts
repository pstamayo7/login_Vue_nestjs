import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  async register(@Body() user: User) {
    return this.usersService.create(user);
  }
}
