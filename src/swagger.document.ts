import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class BaseAPIDocument {
    public builder = new DocumentBuilder();

    public initializeOptions(){
        return this.builder
        .setTitle("Swagger Example") // swagger 가장 큰 제목
        .setDescription("Swagger Study in NestJs") // swagger 문서 설명
        .setVersion("1.0.0")
        .addTag("swagger-study") // 첫 번째 제목 같은 느낌?
        .build();
    }
}