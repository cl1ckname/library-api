import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RentEntity } from "./rent.entity";

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepository: Repository<RentEntity>
    ) {}

    create(rent: RentEntity) {
        return this.rentRepository.save(rent)
    }
}