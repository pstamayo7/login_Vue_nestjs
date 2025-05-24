// src/auth/types/express.d.ts
import { UserPayload } from './user-payload';

declare module 'express' {
  interface Request {
    user: UserPayload;
  }
}
