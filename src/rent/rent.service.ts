import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { DeleteResult, Repository } from "typeorm";
import { RentEntity } from "./rent.entity";

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepository: Repository<RentEntity>,
        private readonly userService: UserService
    ) {}

    async create(rent: RentEntity): Promise<RentEntity> {
        if (await this.userService.getOne(rent.userId).then(user => 
                (!!user.subscription && (user.subscription.expirationDate > new Date())))) // throw error if user haven't subscription 
            throw new HttpException('Your current subscription is invalid', 403)           // or his subscription is expired
        if (await this.rentRepository.count({where: {bookId: rent.bookId}}))
            throw new HttpException('This book already rented or does not exist', 404) 
        if ((await this.rentRepository.count({where: {userId: rent.userId}})) >= 5)
            throw new HttpException('You are already have 5 books', 403)
        return this.rentRepository.save(rent)
    }

    delete(bookId: string): Promise<DeleteResult> {
        return this.rentRepository.delete(bookId)
    }
}