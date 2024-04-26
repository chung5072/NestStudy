import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

//! @로 시작하는 데코레이터는 아래의 함수나 클래스와 떨어져서는 안된다

@ApiTags('Default Controller') // 해당 컨트롤러의 이름
@Controller() // 공통 url 시작점
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary : 'get endpoint - null'}) // api 설명
  @ApiResponse({
    status: 200,
    description: 'Get Default Return - Hello Nest'
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({summary : 'get endpoint - hello'}) // api 설명
  @ApiResponse({
    status: 200,
    description: 'Get hello Return - Hello Everyone!'
  })
  @Get("/hello")
  getHi(): string { 
    // ! 규칙에 따르면 컨트롤러의 함수 이름과 서비스의 함수 이름은 같은게 좋다
    // 근데 달라도 기능 동작에는 상관이 없다
    // return "Hello Everyone!";
    // ! Service에서 비즈니스 로직을 수행함
    return this.appService.getHi();
  }
}
