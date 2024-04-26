/**
 * 이게 루트 모듈인데 하나만 있어야 하는 것으로 이해를 했고
 * 아래에 하위 모듈을 추가하는 건 가능한 것 같음
 * 모듈 - 하나의 서비스 단위?
 * 여기서 거쳐서 컨트롤러나 서비스를 왔다갔다 하는 느낌
 * 마치 스프링의 dispather servlet? 같은 느낌
 * 여기에 앞으로 사용할 모든 것을 import 해야함
 * 뭐 인증 관련된 서비스를 만든다고 하면 여기다가 import를 해서 불러오고
 * 여길 거쳐서 main.ts로 넘어가기 때문에
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';

/**
 * @: 데코레이터
 * 클래스에 함수 기능을 추가할 수 있음
 */
@Module({
  imports: [],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
