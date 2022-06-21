import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RentPostDto } from "./dto/rentPost.dto";
import { RentEntity } from "./rent.entity";
import { RentService } from "./rent.service";

@ApiTags('Rent')
@Controller('api/rent')
export class RentController {
    constructor(
        private readonly rentService: RentService
    ) {}

    @Post()
    create(@Body() rent: RentPostDto) {
        return this.rentService.create(rent)
    }

    @Delete(':bookId')
    delete(@Param('bookId') bookId: string) {
        return this.rentService.delete(bookId)
    }
}