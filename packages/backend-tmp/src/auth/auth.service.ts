import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid4 } from 'uuid';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';
import LoginUserDto from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async isPasswordCorrect(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await argon.verify(hashedPassword, password);
  }

  async generateJWT(payload) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await uuid4();

    return {
      access_token,
      refresh_token,
    };
  }
}
