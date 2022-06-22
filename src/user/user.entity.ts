import { Subscription } from "../subscriprion/subscription.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentEntity } from "../rent/rent.entity";
import { BookEntity } from "src/book/book.entity";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { UserGetDto } from "./dto/userGet.dto";
import { BookService } from "src/book/book.service";
import { domainToUnicode } from "url";

export type CUDto = UserPostDto | UserPutDto

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column('varchar')
    username: string

    @OneToOne(() => Subscription, {cascade: true})
    @JoinColumn({name: 'subscriptionId'})
    subscription?: Subscription

    @OneToMany(() => RentEntity, rent => rent.user)
    @JoinColumn({name: 'userId'})
    rents?: RentEntity[]

    books: BookEntity[]

    constructor(dto: Partial<UserEntity>) {
        Object.assign(this, dto)
    }

    public static fromDto(dto: CUDto | UserGetDto): UserEntity {
        if (dto instanceof UserGetDto)
            delete dto.books
        return new UserEntity(dto as Omit<UserGetDto, 'books'>)
    }

    public toDto(): UserGetDto {
        const user = Object.assign({}, this)
        delete user.rents
        return new UserGetDto(user)
    }
}