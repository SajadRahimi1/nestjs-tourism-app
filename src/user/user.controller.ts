import { Controller, Post, Body, Res, Get, Param, UseInterceptors, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TokenHeaderInceptor } from 'src/guards/token.guard';
import { ForgotCodeDto } from './dtos/forgot-code.dto';
import { RecoryPasswordDto } from './dtos/recovery-password.dto';
import { SingupUserDto } from './dtos/singup-user.dto';
import { ValidateDto } from './dtos/validate-email.dto';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseInterceptors(TokenHeaderInceptor)
export class UserController {
    constructor(private readonly userService: UserService,) { };

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
        const user = await this.userService.login(singupUserDto.email, singupUserDto.password);
        res.status(200).json(user);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiBearerAuth("Authorization")
    @Get('me')
    async getMe(@Headers() header, @Res() res: Response) {
        const user = await this.userService.getUserInformation(header.user.id);
        res.status(200).json(user);
    }


    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('forgot-code')
    async sendCode(@Body() dto: ForgotCodeDto, @Res() res: Response) {
        const response = await this.userService.sendRecoveryCode(dto.email);
        res.status(200).json(response);
    }

    @ApiConsumes("application/x-www-form-urlencoded")
    @Post('forgot-password')
    async forgotPassword(@Body() dto: RecoryPasswordDto, @Res() res: Response) {
        const response = await this.userService.recoveryPassword(dto.email, dto.code, dto.password);
        res.status(200).json(response);
    }


}
