import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query, Req, UseGuards,
} from '@nestjs/common';
import { BarsService } from './bars.service';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { Public } from '../auth/public.decorator';
import { CreateBarMenuDto } from './dto/create-bar-menu.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";

export enum SortByType {
  BEST = 'BEST',
  NEWEST = 'NEWEST',
  LONGEST_ON_MARKET = 'LONGEST_ON_MARKET',
}

@Controller('bars')
export class BarsController {
  constructor(private readonly barsService: BarsService) {}

  @Post()
  @Public()
  create(@Body() createBarDto: CreateBarDto) {
    return this.barsService.create(createBarDto);
  }

  @Post('/:barId/menu')
  @Public()
  createBarMenu(
    @Param('barId') barId: string,
    @Body() createBarMenuDto: CreateBarMenuDto,
  ) {
    return this.barsService.createBarMenu(barId, createBarMenuDto);
  }

  @Get()
  findAll(@Query('sortBy') sortByKey: SortByType = SortByType.BEST) {
    const sortByMap = new Map([
      [SortByType.BEST, { thumbsUp: 'desc' }],
      [SortByType.NEWEST, { createdAt: 'asc' }],
      [SortByType.LONGEST_ON_MARKET, { operatingSinceDate: 'asc' }],
    ]);

    const sortBy = sortByMap.get(sortByKey);

    return this.barsService.findAllWithSort({ page: 1, limit: 15, sortBy });
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.barsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBarDto: UpdateBarDto) {
    return this.barsService.update(id, updateBarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barsService.remove(id);
  }
}
