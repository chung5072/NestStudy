/**꼭 있어야 하는 파일
 * 이름이 바뀌어선 안됨
 */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './swagger.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new BaseAPIDocument().initializeOptions();
  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  // http://localhost:3000/api로 접속했을 때 Swagger UI를 확인할 수 있음
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
