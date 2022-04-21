import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { RentEntity } from "src/rent/rent.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('book')
export class BookEntity {

    @ApiResponseProperty()
    @PrimaryGeneratedColumn('uuid')
    bookId: string

    @ApiProperty()
    @Column('varchar')
    title: string

    @OneToOne(() => RentEntity)
    @JoinColumn({name: 'bookId'})
    rent?: RentEntity
}