import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class BookPostDto {
    @ApiResponseProperty()
    bookId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string
}