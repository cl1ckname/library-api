import { ApiResponseProperty } from "@nestjs/swagger";

export class BookGetDto {

    @ApiResponseProperty()
    bookId: string

    @ApiResponseProperty()
    title: string
}