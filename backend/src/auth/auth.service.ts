import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
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
      role: user.role?.name, // Aquí puede ser .name si hiciste relación con entidad Role
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // REGISTER
  async register(registerDto: RegisterDto) {
    const { first_name, last_name, email, password, role_id } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.rolesRepository.findOne({
      where: role_id ? { id: role_id } : { name: 'user' },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return this.usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });
  }
}
