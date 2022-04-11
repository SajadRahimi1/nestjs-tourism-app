import { Controller,Post,Body,Res } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {Response} from 'express';
import { SingupUserDto } from './dtos/singup-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){};

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('singup')
    async singup(@Body() singupUserDto:SingupUserDto,@Res() res:Response){
        const response =  await this.userService.singup(singupUserDto.email,singupUserDto.password);
        res.status(200).json(response);
    }
}
