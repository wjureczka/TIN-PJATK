import { PartialType } from '@nestjs/mapped-types';
import { CreateBarMenuDto } from './create-bar-menu.dto';

export class UpdateBarMenuDto extends PartialType(CreateBarMenuDto) {}
