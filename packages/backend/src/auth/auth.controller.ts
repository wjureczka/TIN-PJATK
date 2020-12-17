import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  Body,
  Res, Header,
} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';
import {AuthService} from './auth.service';
import {Public} from './public.decorator';
import LoginUserDto from './dto/login-user.dto';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as argon from "argon2";
import {DUPLICATE_KEY} from "../config/mongodb-errors";
import has = Reflect.has;

@Controller('auth')
export class AuthController {
  private readonly JWT_ACCESS_TOKEN_COOKIE_NAME = 'TIN_PJATK_ACCESS_TOKEN_COOKIE';
  private readonly JWT_REFRESH_TOKEN_COOKIE_NAME = 'TIN_PJATK_REFRESH_TOKEN_COOKIE';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
  }

  @Public()
  @Post('/register')
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const hashedPassword = await argon.hash(createUserDto.password);

    return await this.userService
      .create({...createUserDto, password: hashedPassword})
      .catch((error) => {
        if (error.code === DUPLICATE_KEY) {
          return response.code(StatusCodes.CONFLICT).send();
        }

        return response.code(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  }

  @Public()
  @Post('/login')
  @Header('access-control-allow-credentials', 'true')
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
      isAdmin: user.isAdmin
    };

    const jwtTokens = await this.authService.generateJWT(payload);

    await this.userService.update(user._id, {
      refresh_token: jwtTokens.refresh_token,
    });

    return response
      .setCookie(this.JWT_ACCESS_TOKEN_COOKIE_NAME, jwtTokens.access_token, {path: '/', domain: '.beerbars.com'})
      .setCookie(this.JWT_REFRESH_TOKEN_COOKIE_NAME, jwtTokens.refresh_token, {path: '/', domain: '.beerbars.com'})
      .code(200)
      .send();
  }

  @Get('/isLoggedIn')
  getProfile(@Request() request, @Response() response) {
    if (request.user) {
      return response.code(StatusCodes.OK).send();
    }

    return response.code(StatusCodes.UNAUTHORIZED).send();
  }
}
