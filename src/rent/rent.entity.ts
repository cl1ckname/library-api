import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { RentGetDto } from "./dto/rentGet.dto";
import { RentPostDto } from "./dto/rentPost.dto";

@Entity('rent')
export class RentEntity {

    @Column('uuid')
    userId: string

    @PrimaryColumn('uuid')
    bookId: string

    @ManyToOne(() => UserEntity, user => user.rents)
    @JoinColumn({name: 'userId'})
    user?: UserEntity

    @OneToOne(() => BookEntity)
    @JoinColumn({name: 'bookId'})
    book?: BookEntity

    constructor(userId: string, bookId: string) {
        this.userId = userId
        this.bookId = bookId
    }

    public static fromDto(dto: RentPostDto) {
        return new RentEntity(dto.userId, dto.bookId)
    }

    public toDto(): RentGetDto {
        return {userId: this.userId, bookId: this.bookId}
    }
}