import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception/http-exception.filter';
import { HttpResponseInterceptor } from './core/interceptors/http-response/http-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  /* Middlewares Globals */
  app.use(helmet());

  /* Filter Globals */
  app.useGlobalFilters(new HttpExceptionFilter());

  /* Pipes Globals */
  // app.useGlobalPipes(new ValidationPipe());

  /* Interceptors Globals */
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  /* Listening app */
  await app.listen(3000);
}
bootstrap();
