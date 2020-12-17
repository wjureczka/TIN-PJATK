import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOneById(id: string) {
    return this.userModel.findById(id);
  }

  findOneByIdAndRefreshToken(id: string, refreshToken: string) {
    return this.userModel.findOne({ _id: id, refresh_token: refreshToken });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
    );

    return await user.save();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
