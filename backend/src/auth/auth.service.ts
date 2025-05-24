import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // LOGIN
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role, // Incluimos el rol en el token
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // REGISTER
  async register(registerDto: RegisterDto) {
    const { first_name, last_name, email, password, role = 'user' } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });
  }
}
