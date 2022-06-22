import { ApiResponseProperty } from "@nestjs/swagger";
import { BookGetDto } from "src/book/dto/bookGet.dto";
import { Subscription } from "src/subscriprion/subscription.entity";

export class UserGetDto {
    
    @ApiResponseProperty()
    userId: string

    @ApiResponseProperty()
    username: string

    @ApiResponseProperty()
    subscription?: Subscription

    @ApiResponseProperty()
    books?: BookGetDto[]

    constructor(o: Partial<UserGetDto>) {
        Object.assign(this, o)
    }
}