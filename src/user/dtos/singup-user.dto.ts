import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';

export class SingupUserDto {
    @ApiProperty({ required: true,type:String })
    @IsEmail({ message: 'ایمیل درست وارد نشده است' })
    email: string;

    @ApiProperty({ required: true,type:String })
    @IsString({ message: 'رمز عبور درست وارد نشده است' })
    password: string;
}