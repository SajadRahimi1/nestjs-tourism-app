import {ApiProperty} from '@nestjs/swagger';
import {IsEmail,IsString} from 'class-validator';

export class RecoryPasswordDto {

    @ApiProperty({ required: true, type: String })
    @IsEmail({ message: 'ایمیل درست وارد نشده است' })
    email: string;

    @ApiProperty({ required: true, type: String })
    @IsString({ message: 'کد درست وارد نشده است' })
    code: string;

    @ApiProperty({ required: true, type: String })
    @IsString({ message: 'رمز عبور درست وارد نشده است' })
    password: string;


}