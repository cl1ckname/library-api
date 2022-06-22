import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { CUDto, UserEntity } from "./user.entity";


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly baseRepository: Repository<UserEntity>
    ) {} 

    async getOne(userId: string): Promise<UserEntity | null> {
        const user = await this.baseRepository.findOne({where: {userId}, join: {
            alias: 'u',
            leftJoinAndSelect: {
                "rents": "u.rents",
                "subscription": "u.subscription",
                "book": "rents.book"
            }
        }})
        if (!user)
            throw new HttpException(``, 404)
        if (user.rents)
            user.books = user.rents.map(r => r.book)
        delete user.rents
        return user
    }

    async getAll(): Promise<UserEntity[]> {
        const users = await this.baseRepository.find({join: {
            alias: 'u',
            leftJoinAndSelect: {
                "rents": "u.rents",
                "subscription": "u.subscription",
                "book": "rents.book"
            }
        }})

        users.forEach(u => {
            if (u.rents)
                u.books = u.rents.map(rent => rent.book)
            delete u.rents
        })
        return users
    }

    async save(user: UserEntity | UserPostDto | UserPutDto): Promise<UserEntity> {
        return this.baseRepository.save(
            (!(user instanceof UserEntity) ? UserEntity.fromDto(user) : user)
        )
    }

}
