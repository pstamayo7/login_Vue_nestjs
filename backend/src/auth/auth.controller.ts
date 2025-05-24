import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login con email y contraseña' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
