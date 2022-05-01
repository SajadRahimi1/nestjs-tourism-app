import {ApiProperty} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';

export class ForgotCodeDto {
  @ApiProperty()
  @IsEmail({message: 'ایمیل درست وارد نشده است'})
  email: string;
}