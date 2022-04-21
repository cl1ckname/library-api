import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    getAll() {
        return this.userRepository.find({relations: ['subscription']})
    }

    getOne(userId: string) {
        return this.userRepository.findOne({where: {userId: userId}, relations: ['subscription']})
    }

    saveUser(user: Partial<UserEntity>) {
        return this.userRepository.save(user)
    }



    
}