import { MigrationInterface, QueryRunner } from "typeorm"

export class InitMigration implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            create table "subscription" (
                "subscriptionId" uuid CONSTRAINT sub_pk primary key default uuid_generate_v4(),
                "expirationDate" timestamp
            );
            
            create table "user" (
                "userId" uuid CONSTRAINT user_pk primary key default uuid_generate_v4(),
                username varchar(256) not null,
                "subscriptionId" uuid,
                constraint sub_fk
                    foreign key ("subscriptionId")
                        references subscription("subscriptionId")
            );
            
            create table "book" (
                "bookId" uuid CONSTRAINT book_pk primary key default uuid_generate_v4(),
                title varchar(256)
            );
            
            create table "rent" (
                "userId" uuid not null,
                "bookId" uuid constraint  rent_pk primary key default uuid_generate_v4(),
                constraint user_fk
                    foreign key ("userId")
                        references "user"("userId"),
                constraint book_fk
                    foreign key ("bookId")
                        references book("bookId")
            );
            `
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            drop table if exists "rent";
            drop table if exists "book";
            drop table if exists "user";
            drop table if exists "subscription";
            `,
        )
    }
}