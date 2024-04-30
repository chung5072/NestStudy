/**
 * ! DTO - Data Transfer Object - 계층 간 데이터 전송 클래스
 */

import { IsNumber, IsString } from "class-validator";
// npm i @nestjs/mapped-types
// mapped-typse - 타입을 변환시키고 사용할 수 있도록 해주는 것
import { PartialType } from "@nestjs/swagger";
import { CreateMovieDTO } from "./create-movie.dto";

// export class UpdateMovieDTO {
//     // readonly이나 뒤에 ?를 붙여서 필수는 아니게 작성

//     @ApiProperty({
//         example: "쿵푸팬더 4",
//         description: "영화 제목"
//     })
//     @IsString()
//     readonly title?: string;

//     @ApiProperty({
//         example: "2024",
//         description: "영화 개봉 연도"
//     })
//     @IsNumber()
//     readonly year?: number;

//     @ApiProperty({
//         example: ["애니메이션", "액션"],
//         description: "영화 장르"
//     })
//     @IsString({each: true}) // 하나씩 검사
//     readonly genres?: string[];
// }

// CreateMovieDTO가 UpdateMovieDTO의 기본 클래스로 동작함
// 이렇게만 써주면 CreateMovieDTO의 요소들이 필수 요소가 아닌 상태로 작성되는 듯?
// ! PartialType을 swagger에서 import를 해야 swagger에서 정상적으로 다 확인할 수 있음
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) { }