import { ApiResponseProperty } from "@nestjs/swagger";

export class RentGetDto {
    @ApiResponseProperty()
    userId: string

    @ApiResponseProperty()
    bookId: string
}