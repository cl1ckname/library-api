import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription')
export class Subscription {
    
    @PrimaryGeneratedColumn('uuid')
    subscriptionId: string

    @Column('timestamp')
    expirationDate?: Date
}