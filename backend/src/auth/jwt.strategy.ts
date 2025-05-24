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
      secretOrKey: 'secretKey', // reemplaza esto por process.env.JWT_SECRET en producción
    });
  }

  async validate(payload: any) {
    // El payload es lo que se puso en el token al loguearse
    return { userId: payload.sub, email: payload.email };
  }
}
