import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "src/book/book.entity";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";


@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [TypeOrmModule.forFeature([UserEntity, BookEntity])],
    exports: [UserService]
})
export class UserModule {}