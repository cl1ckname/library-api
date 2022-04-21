import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('api/user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @Get('users')
    getAll() {
        return this.userService.getAll()
    }

    @Get('users/:userId')
    getOne(@Param('userId') userId: string) {
        return this.userService.getOne(userId)
    }

    @Post('users')
    createUser(@Body() user: UserEntity) {
        return this.userService.saveUser(user)
    }
}