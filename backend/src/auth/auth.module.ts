// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity'; // Asegúrate que esta ruta sea correcta

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // En producción usa process.env.JWT_SECRET
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Role]), // ✅ Correctamente colocado como módulo separado
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
