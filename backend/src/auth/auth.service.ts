import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common'; 
import { RegisterDto } from './register.dto';  // Asegúrate de tener el DTO correcto

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,  // Accede al servicio de usuarios
  ) {}

  // Método para el login
  async login(loginDto: any) {
    const { email, password } = loginDto;

    // Buscamos al usuario por su correo
    const foundUser = await this.usersService.findOne(email);

    // Si el usuario no existe o la contraseña no es correcta, lanzamos un error de autenticación
    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      throw new UnauthorizedException('Invalid credentials');  // Error 401
    }

    // Si las credenciales son correctas, generamos el JWT
    const payload = { email: foundUser.email, sub: foundUser.id };
    return {
      access_token: this.jwtService.sign(payload),  // Generamos el JWT
    };
  }

 
  async register(registerDto: RegisterDto) {
    const { first_name, last_name, email, password } = registerDto;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con nombre, apellido, email y contraseña encriptada
    return await this.usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,  // Guardar la contraseña encriptada
    });
  }
}
