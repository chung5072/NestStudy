/**
 * 원래는 데이터베이스 모델을 만들어야 한다
 */

import { ApiProperty } from "@nestjs/swagger";

export class Movie {
    id: number;

    @ApiProperty({
        example: "쿵푸팬더 4",
        description: "영화 제목"
    })
    title: string;

    @ApiProperty({
        example: "2024",
        description: "영화 개봉 연도"
    })
    year: number;

    @ApiProperty({
        example: ["애니메이션", "액션"],
        description: "영화 장르"
    })
    genres: string[];
}