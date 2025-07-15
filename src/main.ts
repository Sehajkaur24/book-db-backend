import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS so frontend can access backend
  app.enableCors({
    origin: 'http://localhost:3000', // allow your frontend
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Book Database API')
    .setDescription('Book Database API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
