import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable() // ! Dependency Injection을 위해서 필요함
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        // ! 실제로는 DB의 쿼리가 올 것
        return this.movies;
    }
    
    searchMovie(year: string): Movie[] {
        // 이렇게 문자열에서 숫자로 바꿔주려면 문자열 앞에 +를 붙이면 된다
        return this.movies.filter(movie => movie.year >= +year);
    }

    getOne(id: number): Movie {
        return this.movies.find(movie => movie.id === id);
    }

    deleteOne(id: number) {
        // 실제로 지우는 것이 아니라 남은 영화 값들을 보여주도록 설정
        // 그럼 데이터베이스에서 값을 추가해서 해당 값을 걸러서 가져오게 할 수도 있겠네
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        // return true;
    } 

    createMovie(movieData: CreateMovieDTO) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updatedData: UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteOne(id);

        this.movies.push({...movie, ...updatedData});
    }
}
