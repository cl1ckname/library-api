import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/book/book.entity";
import { Repository } from "typeorm";
import { UserGetDto } from "./dto/userGet.dto";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        private readonly userRepository: UserRepository
    ) {}

    async getAll(): Promise<UserGetDto[]> {
        const users = await this.userRepository.getAll()
        return users.map(u => u.toDto())
    }

    async getOne(userId: string): Promise<UserGetDto> {
        const user = await this.userRepository.getOne(userId)
        if (!user)
            throw new HttpException(`User with id "${userId} not found"`, 404)

        if (user.rents)
            user.books = await Promise.all(
                user.rents.map(async rent => this.bookRepository.findOne({where: {bookId: rent.bookId}}))
            )
        return user.toDto()
    }

    async saveUser(user: UserPostDto): Promise<UserGetDto> {
        const savedUser = await this.userRepository.save(user)
        return this.getOne(savedUser.userId)
    }

    async updateUser(userId: string, user: UserPutDto): Promise<UserGetDto> {
        let userToUpdate = await this.userRepository.getOne(userId)
        userToUpdate = Object.assign(userToUpdate, user)
        return this.userRepository.save(userToUpdate).then(u => u.toDto())
    }


    
}