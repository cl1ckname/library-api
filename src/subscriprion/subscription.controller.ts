import { Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SubscriptionService } from "./subscription.service";

@ApiTags('Subscription')
@Controller('api/subscription')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    @Post('subscription/:userId')
    create(@Param('userId') userId: string) {
        return this.subscriptionService.subscribe(userId)
    }
}