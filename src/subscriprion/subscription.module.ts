import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionEntity } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Module({
    providers: [SubscriptionService],
    controllers: [SubscriptionController],
    imports: [TypeOrmModule.forFeature([SubscriptionEntity])]
})
export class SubscriptionModule {}