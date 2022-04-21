import { SubscriptionEntity } from "../subscriprion/subscription.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

@Entity({name: 'user'})
export class UserEntity {

    @ApiResponseProperty()
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @ApiProperty()
    @Column('varchar')
    username: string

    @ApiResponseProperty()
    @OneToOne(() => SubscriptionEntity)
    @JoinColumn({name: 'subscriptionId'})
    subscription?: SubscriptionEntity
}