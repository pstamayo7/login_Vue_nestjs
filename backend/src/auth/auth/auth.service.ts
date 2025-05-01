import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Asegúrate de que este servicio esté disponible
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const foundUser = await this.usersService.findOne(user.email);
    if (foundUser && await bcrypt.compare(user.password, foundUser.password)) {
      const payload = { email: foundUser.email, sub: foundUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }

  // Método para registrar un nuevo usuario
  async register(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create({
      ...user,
      password: hashedPassword,
    });
  }
}
