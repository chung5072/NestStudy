import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Movie Controller")
@Controller('movies') // url entry point
export class MoviesController {

    @ApiOperation({summary : "get endpoint - null"})
    @ApiResponse({
        status: 200,
        description: 'GET movies return - all movies'
    })
    @Get()
    getAll(): string {
        return "This will return ALL movies";
    }
    
    @ApiOperation({summary: "get endpoint - spec id value"})
    @ApiResponse({
        status: 200,
        description: 'GET movie return - only one movie by id value'
    })
    @Get("/:id")
    // ! @Param으로 파라미터 추가 - url에 값을 추가한다는 것을 이해함
    // ! Get 안에 쓴 :[id]의 값과 @Param안에 쓴 ("[id]")의 값은 같아야 함
    // 다만 id: string에 쓴 id 값은 달라도 됨 - 근데 그냥 맞추자
    getOne(@Param("id") id: string): string {
        return `This will return ONE movie with id: ${id}`;
    }

    @ApiOperation({summary : "post endpoint"})
    @ApiResponse({
        status: 200,
        description: "POST - create ONE movie"
    })
    @Post()
    createMovie() : string {
        return "This will create A movie";
    }

    @ApiOperation({summary : "delete endpoint"})
    @ApiResponse({
        status: 200,
        description: "DELETE - delete ONE moive"
    })
    @Delete("/:id")
    removeMovie(@Param("id") movieId: string): string {
        // ! 이렇게 delete와 param을 맞추고, 
        // ! 구분지어서 매개변수의 movieId와 return안에 들어가는 movieId를 맞춰도 된다
        return `This will remove ${movieId} movie`;
    }

    // ! put은 리소스 전체를 업데이트할 때 사용하고 Patch는 일부를 업데이트할 때 사용
    @ApiOperation({summary: "PATCH endpoint"})
    @ApiResponse({
        status: 200,
        description: "PATCH - ID 값을 사용하여 한 영화의 정보를 업데이트 함"
    })
    @Patch('/:id')
    patchMovie(@Param('id') movieId: string): string {
        return `This will patch ${movieId} movie\'s information`;
    }
}
