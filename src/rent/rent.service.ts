import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        private readonly userService: UserService
    ) {}

    async create(rentDto: RentPostDto): Promise<RentGetDto> {
        const rent = RentEntity.fromDto(rentDto)
        const user = await this.userService.getOne(rent.userId)
        if (!user.subscription || user.subscription.expirationDate < new Date()) // throw error if user haven't subscription 
            throw new HttpException('Your current subscription is invalid', 400)           // or his subscription is expired
        if (await this.rentRepository.findOne({where: {bookId: rent.bookId}}))
            throw new HttpException('This book already rented or does not exist', 404) 
        if ((await this.rentRepository.count({where: {userId: rent.userId}})) >= 5)
            throw new HttpException('You are already have 5 books', 400)
        const newRent = await this.rentRepository.save(rent)
        return newRent.toDto()
    }

    delete(bookId: string): Promise<DeleteResult> {
        return this.rentRepository.delete(bookId)
    }
}