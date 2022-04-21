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

    getAll(): Promise<UserEntity[]> {
        return this.userRepository.find({relations: ['subscription', 'rents']})
    }

    getOne(userId: string): Promise<UserEntity> {
        return this.userRepository.findOne({where: {userId: userId}, relations: ['subscription', 'rents']})
    }

    saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user)
    }

    async updateUser(userId: string, user: UserEntity): Promise<UserEntity> {
        let userToUpdate = await this.userRepository.findOne({where: {userId}})
        userToUpdate = Object.assign(userToUpdate, user)
        return this.userRepository.save(userToUpdate)
    }


    
}