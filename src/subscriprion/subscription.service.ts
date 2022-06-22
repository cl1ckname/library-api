import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "./subscription.entity";
import { UserEntity } from "src/user/user.entity";
import { UserGetDto } from "src/user/dto/userGet.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class SubscriptionService {
    constructor (
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
        private readonly userService: UserService
    ) {}

    async subscribe(userId: string): Promise<UserGetDto> {
        const userDto = await this.userService.getOne(userId)
        if (userDto?.subscription?.expirationDate > new Date())
            throw new HttpException('You are already have subscription!', 400)
        
        const sub = new Subscription()
        sub.expirationDate = new Date()
        sub.expirationDate.setFullYear(sub.expirationDate.getFullYear() + 1) // subscription period - one year
        userDto.subscription = await this.subscriptionRepository.save(sub)
        const savedUser = await this.userService.saveUser(userDto)
        console.log(savedUser, userDto)
        return savedUser
    }
}