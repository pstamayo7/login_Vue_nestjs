// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // Asegúrate de tener este archivo creado
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // ⚠️ En producción, usa process.env.JWT_SECRET
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule], // 👈 Para que otros módulos puedan firmar/verificar tokens si necesitan
})
export class AuthModule {}
