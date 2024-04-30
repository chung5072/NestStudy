/**꼭 있어야 하는 파일
 * 이름이 바뀌어선 안됨
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// npm i --save @nestjs/swagger [swagger-ui-express || fastify-swagger]
// swagger 사용을 위해 npm i를 진행
import { SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocument } from './swagger.document';
// npm i class-validator class-transformer
// 유효성 검사를 위해서 npm i 를 진행
import { ValidationPipe } from '@nestjs/common'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // ! 유효성 검사를 해주는 파이프 - 코드가 지나는 경로
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true // 유저가 보낸 값을 우리가 원하는 실제 값으로 변경해줌
      /** transform
       * id가 url에서는 string이었는데
       * 이것을 통해서 number 형태로 넘어옴 - 자동으로 타입을 변경해줌
       */
    })
  );

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
