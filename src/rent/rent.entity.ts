import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity('rent')
export class RentEntity {

    @ApiProperty()
    @Column('uuid')
    userId: string

    @ApiProperty()
    @PrimaryColumn('uuid')
    bookId: string

    @ManyToOne(() => UserEntity, user => user.rents)
    @JoinColumn({name: 'userId'})
    user?: UserEntity

    @OneToOne(() => BookEntity)
    @JoinColumn({name: 'bookId'})
    book?: BookEntity
}