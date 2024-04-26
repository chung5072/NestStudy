/**
 * 대충 Spring에서 Model과 연관된 Service 해당하는
 * ! 비즈니스 로직을 수행하는 부분
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  getHi(): string {
    return 'Hi Nest!';
  }
}
