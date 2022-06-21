import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserPostDto } from "./dto/userPost.dto";
import { UserPutDto } from "./dto/userPut.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('api/user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @Get(':userId')
    getOne(@Param('userId') userId: string) {
        return this.userService.getOne(userId)
    }

    @Put(':userId')
    updateUser(@Param('userId') userId: string, @Body() user: UserPutDto) {
        return this.userService.updateUser(userId, user)
    }

    @Post()
    createUser(@Body() user: UserPostDto) {
        return this.userService.saveUser(user)
    }
}