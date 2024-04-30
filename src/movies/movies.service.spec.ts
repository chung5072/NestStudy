import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // 여기서 미리 영화를 생성하면 테스트마다 영화를 생성하지 않아도 된다.
  });

  // 이외에도 다른 함수들이 있음
  // beforeEach, AfterEach, beforeAll, afterAll ... 
  afterAll(() => {
    // 데이터베이스를 싹 비우는 등 그런 기능을 집어 넣을 수 있음
  })

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

  describe("deleteOne()", () => {
    it("delete a movie", () => {
      // 삭제 전에 영화를 하나 만듦
      service.createMovie({
        // id는 자동으로 생성해주니까
        title: "test",
        year: 2024,
        genres: [
          "animation", "action"
        ]
      });
      // 만든 후 확인
      console.log(service.getAll());
      const allMovies = service.getAll();
      
      service.deleteOne(1);

      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMovies.length - 1);
    })

    it("should return a 404", () => {
      try {
        service.deleteOne(9999999999);
      } catch (error) {
        expect(error).toEqual(NotFoundException);
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;

      service.createMovie({
        // id는 자동으로 생성해주니까
        title: "test",
        year: 2024,
        genres: [
          "animation", "action"
        ]
      })

      console.log(service.getOne(1).title);

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe("update", () => {
    it("should update a movie", () => {
      service.createMovie({
        // id는 자동으로 생성해주니까
        title: "test",
        year: 2024,
        genres: [
          "animation", "action"
        ]
      });

      service.update(1, {
        title: "updated test"
      });

      const updatedMovie = service.getOne(1);

      expect(updatedMovie.title).toEqual("updated test");
    })
  })
});
