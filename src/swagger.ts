import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('My contacts API')
    .setDescription('API da aplicação my_contacts ')
    .setVersion('1.0')
    .setContact(
      'Max Garcia',
      'https://github.com/maxgarcia123',
      'maxg.silva123@gmail.com',
    )
    .addBearerAuth()
    .build();

  const custom: SwaggerCustomOptions = {
    customSiteTitle: 'My_contacts API',
  };

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, custom);
}
