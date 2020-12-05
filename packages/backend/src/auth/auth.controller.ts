import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid4 } from 'uuid';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Public } from './public.decorator';
import LoginUserDto from './dto/login-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('/login')
  async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    if (!user) {
      return response.code(StatusCodes.BAD_REQUEST).send();
    }

    const isPasswordCorrect = await this.authService.isPasswordCorrect(
      user.password,
      loginUserDto.password,
    );

    if (!isPasswordCorrect) {
      return response.code(StatusCodes.BAD_REQUEST).send();
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const jwtTokens = await this.authService.generateJWT(payload);

    await this.userService.update(user._id, {
      refresh_token: jwtTokens.refresh_token,
    });

    return response.send(jwtTokens);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
