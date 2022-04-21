import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Injectable()
export class SubscriptionService {
    constructor (
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
        private readonly userService: UserService
    ) {}

    async subscribe(userId: string) {
        const user = await this.userService.getOne(userId)
        if (user.subscription && user.subscription.expirationDate > new Date())
            throw new HttpException('You are already have subscription!', 403)
        
            const sub = new SubscriptionEntity()
        sub.expirationDate = new Date()
        sub.expirationDate.setFullYear(sub.expirationDate.getFullYear() + 1)
        user.subscription = await this.subscriptionRepository.save(sub)
        return this.userService.saveUser(user)
    }
}