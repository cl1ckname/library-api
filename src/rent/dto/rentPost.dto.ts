import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class RentPostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    bookId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string
}