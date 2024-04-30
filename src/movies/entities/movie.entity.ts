/**
 * ! Entity - 데이터베이스에 1대1 대응하는 클래스
 */
export class Movie {
    id: number;

    title: string;
    
    year: number;

    genres: string[];
}