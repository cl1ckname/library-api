import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BookEntity } from "./book.entity";
import { BookService } from "./book.service";
import { BookPostDto } from "./dto/bookPost.dto";


@ApiTags('Book')
@Controller('api/book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) {}

    @Post()
    create(@Body() book: BookPostDto) {
        return this.bookService.create(book)
    }

    @Get()
    get() {
        return this.bookService.getAll()
    }

    @Get(':bookId')
    getOne(@Param() bookId: string) {
        return this.bookService.getOne(bookId)
    }
}