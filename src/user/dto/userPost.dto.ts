import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserPostDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

}