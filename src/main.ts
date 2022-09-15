import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
import { AppModule } from './app.module';



// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: false, transform: true }),
    );

    await app.listen(configService.getPort(), '0.0.0.0');

  } catch (exception) {
    console.log(exception);
    if (exception.code == 'ECONNREFUSED') {
      console.log('Failed to make a database connection. ' + 'Check the database connection settings and make sure the database server is active')
    } else {
      console.log('Exception occurred in the application');
    }
  }
}


bootstrap();
