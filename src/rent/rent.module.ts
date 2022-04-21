import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentController } from "./rent.controller";
import { RentEntity } from "./rent.entity";
import { RentService } from "./rent.service";


@Module({
    imports: [TypeOrmModule.forFeature([RentEntity])],
    providers: [RentService],
    controllers: [RentController]
})
export class RentModule {}