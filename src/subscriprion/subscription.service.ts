import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "./subscription.entity";
import { UserEntity } from "src/user/user.entity";
import { UserGetDto } from "src/user/dto/userGet.dto";

@Injectable()
export class SubscriptionService {
    constructor (
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async subscribe(userId: string): Promise<UserGetDto> {
        const userDto = await this.userRepository.findOne({where: {userId}})
        const user = UserEntity.fromDto(userDto)
        if (user?.subscription?.expirationDate > new Date())
            throw new HttpException('You are already have subscription!', 400)
        
        const sub = new Subscription()
        sub.expirationDate = new Date()
        sub.expirationDate.setFullYear(sub.expirationDate.getFullYear() + 1) // subscription period - one year
        user.subscription = await this.subscriptionRepository.save(sub)
        return this.userRepository.save(user).then(u => u.toDto())
    }
}