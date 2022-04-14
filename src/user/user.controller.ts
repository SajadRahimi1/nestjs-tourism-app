import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SingupUserDto } from './dtos/singup-user.dto';
import { ValidateDto } from './dtos/validate-email.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('singup')
    async singup(@Body() singupUserDto: SingupUserDto, @Res() res: Response) {
        const response = await this.userService.singup(singupUserDto.email, singupUserDto.password);
        res.status(200).json(response);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('validate')
    async validate(@Body() singupUserDto: ValidateDto) {
        return await this.userService.validate(singupUserDto.email, singupUserDto.code);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('login')
    async login(@Body() singupUserDto: SingupUserDto, @Res() res: Response) {
        const user= await this.userService.login(singupUserDto.email, singupUserDto.password);
        res.status(200).json(user);
    }
}
