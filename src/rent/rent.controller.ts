import { Body, Controller, Post } from "@nestjs/common";
import { RentEntity } from "./rent.entity";
import { RentService } from "./rent.service";


@Controller('api/rent')
export class RentController {
    constructor(
        private readonly rentService: RentService
    ) {}

    @Post()
    create(@Body() rent: RentEntity) {
        return this.rentService.create(rent)
    }
}