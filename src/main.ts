import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // prueba

  // recordar usar como etiqueta en los controller no en el main da problemas
  
   
  // app.useGlobalPipes(
  //   new ValidationPipe({whitelist:true, forbidNonWhitelisted:true}),
  // )

  const config = new DocumentBuilder()
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
    }
  });



  await app.listen(3000);
}
bootstrap();
