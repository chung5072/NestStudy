import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  /**
   * 테스팅 규칙
   * it("내가 작성할 테스팅 제목", () => {
   *  expect(내가 기대하는 결과값).함수()
   *  밑에서 사용한 함수는 toEqual(값)
   * })
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2 + 3).toEqual(5)
  })

  // describe 안에 또 describe를 작성할 수 있음
  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne()", () => {
    it("should return a movie", () => {
      // 찾기 전에 데이터를 먼저 넣지 않으면 에러가 날 수 있음
      service.createMovie({
        // id는 자동으로 생성해주니까
        title: "test",
        year: 2024,
        genres: [
          "animation", "action"
        ]
      })

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
      // expect(movie.year).toEqual(2024);
    })
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        // ! 기대값인 instance가 해당 클래스에 속하는지
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
