import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/book/book.entity";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    getAll(): Promise<UserEntity[]> {
        return this.userRepository.find({relations: ['subscription', 'rents']})
    }

    getOne(userId: string): Promise<UserEntity> {
        return this.userRepository.findOne({where: {userId: userId}, relations: ['subscription', 'rents']}).then(
            async user => {
                user.books = await Promise.all(
                    user.rents.map(async rent => await this.bookRepository.findOne({where: {bookId: rent.bookId}}))
                )
                delete user.rents
                return user
            }
        )
    }

    saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user)
    }

    async updateUser(userId: string, user: UserEntity): Promise<UserEntity> {
        let userToUpdate = await this.userRepository.findOne({where: {userId}})
        userToUpdate = Object.assign(userToUpdate, user)
        return this.userRepository.save(userToUpdate)
    }


    
}