import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('IDBI TECHNICAL TEST')
    .setDescription('The IDBI API')
    .setVersion('1.0')
    .addTag('IDBI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document,{
    explorer:true,
    swaggerOptions:{
      filter:true,
      showRequestDuration:true,
      multipart:true,
    }
  });

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);
}
bootstrap();
