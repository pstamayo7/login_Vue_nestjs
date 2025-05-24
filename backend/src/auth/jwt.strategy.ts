// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // ⚠️ Reemplaza por env var en producción
    });
  }

  async validate(payload: any) {
    // Devuelve todo lo que quieras disponible en req.user
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role, // 👈 Asegúrate de que esto esté en el payload al generar el token
    };
  }
}
