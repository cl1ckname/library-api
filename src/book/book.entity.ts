import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('book')
export class BookEntity {

    @ApiResponseProperty()
    @PrimaryGeneratedColumn('uuid')
    bookId: string

    @ApiProperty()
    @Column('varchar')
    title: string
}