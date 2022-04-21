import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    create(book: BookEntity) {
        return this.bookRepository.save(book)
    }

    getOne(bookId: string) {
        return this.bookRepository.findOne({where: {bookId}, relations: ['rent']})
    }

    getAll() {
        return this.bookRepository.find({relations: ['rent']})
    }
    
}