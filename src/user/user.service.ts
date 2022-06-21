import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/book/book.entity";
import { Repository } from "typeorm";
import { UserGetDto } from "./dto/userGet.dto";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { UserEntity } from "./user.entity";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async getAll(): Promise<UserGetDto[]> {
        const users = await this.userRepository.find({relations: ['subscription', 'rents']})
        return users.map(u => u.toDto())
    }

    async getOne(userId: string): Promise<UserGetDto> {
        const user = await this.userRepository.findOne({where: {userId: userId}, relations: ['subscription', 'rents']})
        if (!user)
            throw new HttpException(`User with id "${userId} not found"`, 404)

        if (user.rents)
            user.books = await Promise.all(
                user.rents.map(async rent => this.bookRepository.findOne({where: {bookId: rent.bookId}}))
            )
        return user.toDto()
    }

    async saveUser(user: UserPostDto): Promise<UserGetDto> {
        const userEntity = UserEntity.fromDto(user)
        return this.userRepository.save(userEntity).then(user => user.toDto())
    }

    async updateUser(userId: string, user: UserPutDto): Promise<UserGetDto> {
        const userEntity = UserEntity.fromDto(user)
        let userToUpdate = await this.userRepository.findOne({where: {userId}})
        userToUpdate = Object.assign(userToUpdate, userEntity)
        return this.userRepository.save(userToUpdate).then(u => u.toDto())
    }


    
}