import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsUUID } from "class-validator"

export class UserPutDto {

    @ApiProperty({required: false})
    @IsUUID()
    @IsOptional()
    username?: string

}