import { RentEntity } from "src/rent/rent.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookGetDto } from "./dto/bookGet.dto";
import { BookPostDto } from "./dto/bookPost.dto";

@Entity('book')
export class BookEntity {

    @PrimaryGeneratedColumn('uuid')
    bookId: string

    @Column('varchar')
    title: string

    @OneToOne(() => RentEntity)
    @JoinColumn({name: 'bookId'})
    rent?: RentEntity

    constructor(title: string, bookId?: string) {
        this.title = title
        this.bookId = bookId
    }

    public static fromDto(dto: BookPostDto): Partial<BookEntity> {
        return new BookEntity(dto.title, dto.bookId)
    }

    public toDto(): BookGetDto {
        const book = Object.assign({}, this)
        delete book.rent
        return book
    }
}