import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // 이렇게 수정해서 movies를 테스팅하는 동안 애플리케이션 유지
  // beforeEach(async () => {
  beforeAll(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스팅을 진행할 때마다 애플리케이션을 생성함
    // 실제 서비스에 올라가는 애플리케이션과는 다른 테스팅용 애플리케이션
    // 이러면 movies의 데이터는 계속해서 초기화됨
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }))
    await app.init();
  });

  // url 요청에 대한 테스팅
  // control, service, pip 등 모든 결과에 대한 테스팅
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Nest!');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    });

    it("POST", () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: "test",
        year: 2024,
        genres: ["test"]
      })
      .expect(201); // 201은 생성이 되었다는 뜻
    })

    it("DELETE", () => {
      return request(app.getHttpServer()).delete("/movies").expect(404);
    })
  });

  describe("/movie/:id", () => {
    // 어떤 것을 할 것인지 미리 적음
    // it.todo("GET");
    it("GET 200", () => {
      // url에서 1은 string 타입
      // 메인 애플리케이션에서 파이프를 통해 transform을 적용시켜 타입을 변환시켰었음
      // 테스팅에서도 똑같이 적용을 시켜야 함
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    })
    it("GET 404", () => {
      return request(app.getHttpServer())
      .get("/movies/99999999")
      .expect(404);
    })

    // it.todo("POST");
    it("POST 400", () => {
      return request(app.getHttpServer())
      .post("/movies").send({hacked: "fuckyeah!"})
      .expect(400);
    })

    // it.todo("PATCH");
    it("PATCH", () => {
      return request(app.getHttpServer())
      .patch("/movies/1").send({title: "updated test"})
      .expect(200); // 삭제도 200
    })

    // it.todo("DELETE");
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200);
    })
  })
});
