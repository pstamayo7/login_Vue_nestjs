import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';  // Importamos el UsersModule aquí

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // Usa una clave secreta más segura en producción
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule, // Agregamos el UsersModule para que el servicio de usuarios sea accesible
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
