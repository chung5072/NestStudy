import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@ApiTags("Movie Controller")
@Controller('movies') // url entry point
export class MoviesController {

    // 이게 약간 spring의 @Autowired랑 비슷한 느낌
    constructor(private readonly moviesService: MoviesService) {}

    @ApiOperation({summary : "get endpoint - null"})
    @ApiResponse({
        status: 200,
        description: "GET movies return - all movies"
    })
    @Get()
    getAll(): Movie[] {
        // return "This will return ALL movies";
        return this.moviesService.getAll();
    }

    @ApiOperation({summary: "GET endpoint - spec string value"})
    @ApiResponse({
        status: 200,
        description: "GET movie return - contain spec info"
    })
    // ! 순서도 중요함. - id보다 밑에 있으면 search를 id로 판단함
    @Get('search')
    // ! Query -> http.../search?year=2024
    searchMovie(@Query('year') searchingYear: string) {
        // return `We are searching for a movie made after: ${searchingYear}`
        return this.moviesService.searchMovie(searchingYear);
    }
    
    @ApiOperation({summary: "get endpoint - spec id value"})
    @ApiResponse({
        status: 200,
        description: 'GET movie return - only one movie by id value'
    })
    @Get(':id')
    // ! http.../001
    // ! @Param으로 파라미터 추가 - url에 값을 추가한다는 것을 이해함
    // ! Get 안에 쓴 :[id]의 값과 @Param안에 쓴 ("[id]")의 값은 같아야 함
    // 다만 id: string에 쓴 id 값은 달라도 됨 - 근데 그냥 맞추자
    getOne(@Param('id') id: string): Movie {
        // return `This will return ONE movie with id: ${id}`;
        // return this.moviesService.getOne(id);
        const movie = this.moviesService.getOne(id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }

        return movie;
    }

    @ApiOperation({summary : "post endpoint"})
    @ApiResponse({
        status: 200,
        description: "POST - create ONE movie"
    })
    @Post()
    createMovie(@Body() movieData: Movie) {
        // console.log(movieData)
        // return movieData;
        return this.moviesService.createMovie(movieData);
    }

    @ApiOperation({summary : "delete endpoint"})
    @ApiResponse({
        status: 200,
        description: "DELETE - delete ONE moive, show remains"
    })
    @Delete(':id')
    removeMovie(@Param("id") movieId: string) {
        // ! 이렇게 delete와 param을 맞추고, 
        // ! 구분지어서 매개변수의 movieId와 return안에 들어가는 movieId를 맞춰도 된다
        // return `This will remove ${movieId} movie`;
        // return this.moviesService.deleteOne(movieId);
        // 삭제하고자 하는 영화를 찾고
        this.getOne(movieId);
        // 남은 영화들을 출력
        this.moviesService.deleteOne(movieId);
    }

    // ! put은 리소스 전체를 업데이트할 때 사용하고 Patch는 일부를 업데이트할 때 사용
    @ApiOperation({summary: "PATCH endpoint"})
    @ApiResponse({
        status: 200,
        description: "PATCH - ID 값을 사용하여 한 영화의 정보를 업데이트 함"
    })
    @Patch(':id')
    patchMovie(@Param('id') movieId: string, @Body() updateData: Movie) {
        // return `This will patch ${movieId} movie\'s information`;
        return {
            updatedMovie: movieId,
            ...updateData,
        }  
    }
}
