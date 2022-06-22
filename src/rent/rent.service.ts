import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookService } from "src/book/book.service";
import { UserService } from "src/user/user.service";
import { DeleteResult, Repository } from "typeorm";
import { RentGetDto } from "./dto/rentGet.dto";
import { RentPostDto } from "./dto/rentPost.dto";
import { RentEntity } from "./rent.entity";

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepository: Repository<RentEntity>,
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) {}

    async create(rentDto: RentPostDto): Promise<RentGetDto> {
        const rent = RentEntity.fromDto(rentDto)
        const user = await this.userService.getOne(rent.userId)
        if (!user)
            throw new HttpException(`Could not found user with id ${rent.userId}`, 404)
        if (!(await this.bookService.getOne(rentDto.bookId)))
            throw new HttpException(`Could not found book with id ${rent.bookId}`, 404)
        if (!user.subscription || user.subscription.expirationDate < new Date()) // throw error if user haven't subscription 
            throw new HttpException('Your current subscription is invalid', 400)           // or his subscription is expired
        if (await this.rentRepository.findOne({where: {bookId: rent.bookId}}))
            throw new HttpException('This book already rented', 400) 
        if ((await this.rentRepository.count({where: {userId: rent.userId}})) >= 5)
            throw new HttpException('You are already have 5 books', 400)
        const newRent = await this.rentRepository.save(rent)
        return newRent.toDto()
    }

    delete(bookId: string): Promise<DeleteResult> {
        return this.rentRepository.delete(bookId)
    }
}