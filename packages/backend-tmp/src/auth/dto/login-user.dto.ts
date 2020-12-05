import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
