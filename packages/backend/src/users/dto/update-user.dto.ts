import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.schema';

export class UpdateUserDto extends PartialType(User) {}
