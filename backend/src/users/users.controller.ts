import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/register.dto'; // Asegúrate de que esté bien importado
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {  ApiResponse } from '@nestjs/swagger';
import { UserProfileDto } from './dto/user-profile.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserProfileDto })
  @Get('me')
  getMe(@Req() req: Request): UserProfileDto {
    return req.user as any;
  }
}