import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription')
export class SubscriptionEntity {
    @PrimaryGeneratedColumn('uuid')
    subscriptionId: string

    @Column('timestamp')
    expirationDate?: Date
}