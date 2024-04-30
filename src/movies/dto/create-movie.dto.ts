/**
 * ! DTO - Data Transfer Object - 계층 간 데이터 전송 클래스
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDTO {
    @ApiProperty({
        example: "쿵푸팬더 4",
        description: "영화 제목"
    })
    @IsString()
    readonly title: string;

    @ApiProperty({
        example: "2024",
        description: "영화 개봉 연도"
    })
    @IsNumber()
    readonly year: number;

    @ApiProperty({
        example: ["애니메이션", "액션"],
        description: "영화 장르"
    })
    @IsOptional() // 이걸 작성하면 꼭 필수로 넣지 않아도 되는 듯?
    @IsString({each: true}) // 하나씩 검사
    readonly genres: string[];
}