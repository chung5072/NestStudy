import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        // ! 실제로는 DB의 쿼리가 올 것
        return this.movies;
    }
    
    searchMovie(year: string): Movie[] {
        return this.movies.filter(movie => movie.year >= +year);
    }

    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === +id);
    }

    deleteOne(id: string): Movie[] {
        // 실제로 지우는 것이 아니라 남은 영화 값들을 보여주도록 설정
        // 그럼 데이터베이스에서 값을 추가해서 해당 값을 걸러서 가져오게 할 수도 있겠네
        return this.movies.filter(movie => movie.id !== +id);
        // return true;
    } 

    createMovie(movieData: Movie) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }
}
