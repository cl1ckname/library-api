import { Subscription } from "../subscriprion/subscription.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentEntity } from "../rent/rent.entity";
import { BookEntity } from "src/book/book.entity";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { UserGetDto } from "./dto/userGet.dto";

type CUDto = UserPostDto | UserPutDto

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column('varchar')
    username: string

    @OneToOne(() => Subscription)
    @JoinColumn({name: 'subscriptionId'})
    subscription?: Subscription

    @OneToMany(() => RentEntity, rent => rent.user)
    @JoinColumn({name: 'userId'})
    rents?: RentEntity[]

    books: BookEntity[]

    constructor(username: string) {
        this.username = username
    }

    public static fromDto(dto: CUDto): UserEntity {
        return new UserEntity(dto.username)
    }

    public toDto(): UserGetDto {
        const user = Object.assign({}, this)
        delete user.rents
        return user
    }
}