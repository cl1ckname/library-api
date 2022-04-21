import { SubscriptionEntity } from "../subscriprion/subscription.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column('varchar')
    username: string

    @OneToOne(() => SubscriptionEntity)
    @JoinColumn()
    subscription: SubscriptionEntity
}