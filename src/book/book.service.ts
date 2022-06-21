import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";
import { BookGetDto } from "./dto/bookGet.dto";
import { BookPostDto } from "./dto/bookPost.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async create(book: BookPostDto): Promise<BookGetDto > {
        const bookEntity = BookEntity.fromDto(book)
        const newBook = await this.bookRepository.save(bookEntity)
        return newBook.toDto()
    }

    async getOne(bookId: string): Promise<BookGetDto> {
        const book =  await this.bookRepository.findOne({where: {bookId}, relations: ['rent']})
        return book.toDto()
    }

    async getAll(): Promise<BookGetDto[]> {
        const books =  await this.bookRepository.find({relations: ['rent']})
        return books.map(book => book.toDto())
    }
    
}