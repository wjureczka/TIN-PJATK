import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import * as argon from 'argon2';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { DUPLICATE_KEY } from '../config/mongodb-errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const hashedPassword = await argon.hash(createUserDto.password);

    return await this.usersService
      .create({ ...createUserDto, password: hashedPassword })
      .then((user) => response.send({ userId: user._id, email: user.email }))
      .catch((error) => {
        if (error.code === DUPLICATE_KEY) {
          return response.code(StatusCodes.CONFLICT).send();
        }

        return error;
      });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
