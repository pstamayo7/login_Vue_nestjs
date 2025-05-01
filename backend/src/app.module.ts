import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',   // por ejemplo: 'sa'
      password: 'root', // la contraseña que configuraste
      database: 'bdd_login',
      synchronize: false, // no usar en producción
      entities: [User],
      options: {
        encrypt: false,
        trustServerCertificate: true, // solo para desarrollo
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule, // para usar el repositorio de User más adelante
  ],
})
export class AppModule {}
