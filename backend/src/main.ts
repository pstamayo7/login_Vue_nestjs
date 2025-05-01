import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:8081',  // Permitir solicitudes desde localhost:8081 (frontend Vue.js)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permitir métodos HTTP específicos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Permitir ciertos encabezados
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Login')
    .setDescription('Endpoints de autenticación para login y registro')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validación global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
