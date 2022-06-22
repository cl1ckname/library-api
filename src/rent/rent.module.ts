import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from "src/book/book.module";
import { UserModule } from "src/user/user.module";
import { RentController } from "./rent.controller";
import { RentEntity } from "./rent.entity";
import { RentService } from "./rent.service";


@Module({
    imports: [TypeOrmModule.forFeature([RentEntity]), UserModule, BookModule],
    providers: [RentService],
    controllers: [RentController]
})
export class RentModule {}