import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// ! Dependency Injection을 위해서 필요함
// Nest.js가 알아서 import를 해줌. 개발자가 직접 작성할 필요가 없음
// IoC와 DI는 같이 움직이는 듯
// 개발자가 직접 의존 관계를 만들어 주는 것이 아니라 Nest.js / Spring에서 만들어줌
@Module({
    controllers: [MoviesController],
    providers: [MoviesService]
})
export class MoviesModule {}
