import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { SubscriptionController } from "./subscription.controller";
import { Subscription } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Module({
    providers: [SubscriptionService],
    controllers: [SubscriptionController],
    imports: [TypeOrmModule.forFeature([Subscription, UserEntity])]
})
export class SubscriptionModule {}