import { SubscriptionEntity } from "../subscriprion/subscription.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { RentEntity } from "../rent/rent.entity";
import { BookEntity } from "src/book/book.entity";

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

    // @ApiResponseProperty()
    @OneToMany(() => RentEntity, rent => rent.user)
    @JoinColumn({name: 'userId'})
    rents?: RentEntity[]

    @ApiResponseProperty()
    books: BookEntity[]
}