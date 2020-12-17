import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { BarsService } from './bars.service';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { Public } from '../auth/public.decorator';
import { CreateBarMenuDto } from './dto/create-bar-menu.dto';
import { UsersService } from '../users/users.service';
import { StatusCodes } from 'http-status-codes';
import { UpdateBarMenuDto } from './dto/update-bar-menu.dto';

export enum SortByType {
  BEST = 'BEST',
  NEWEST = 'NEWEST',
  LONGEST_ON_MARKET = 'LONGEST_ON_MARKET',
}

@Controller('bars')
export class BarsController {
  constructor(
    private readonly barsService: BarsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createBar(@Req() request, @Body() createBarDto: CreateBarDto) {
    const userId = request.user.id;
    const bar = await this.barsService.createBar(createBarDto, userId);

    const user = await this.usersService
      .findOneById(userId)
      .populate('ownedBars');

    user.ownedBars.push(bar);

    await user.save();

    return bar;
  }

  @Post('/:barId/menu')
  async createBarMenu(
    @Req() request,
    @Res() response,
    @Param('barId') barId: string,
    @Body() createBarMenuDto: CreateBarMenuDto,
  ) {
    const userId = request.user.id;
    const user = await this.usersService
      .findOneById(userId)
      .populate({ path: 'ownedBars', populate: { path: 'menu' } });
    const [bar] = user.ownedBars.filter(
      (barElement) => barElement._id.toString() === barId,
    );

    if (!bar) {
      return response.code(StatusCodes.FORBIDDEN).send();
    }

    const doesBarHaveManufacturerInMenu = bar.menu.some(
      (menu) =>
        menu.manufacturer._id.toString() === createBarMenuDto.manufacturerId,
    );

    if (doesBarHaveManufacturerInMenu) {
      return response.code(StatusCodes.CONFLICT).send();
    }

    await this.barsService.createBarMenu(barId, createBarMenuDto);

    return response.code(StatusCodes.CREATED).send();
  }

  @Delete('/:barId/menu/:barMenuId')
  async deleteBarMenu(
    @Req() request,
    @Res() response,
    @Param('barId') barId,
    @Param('barMenuId') barMenuId,
  ) {
    const user = request.user;
    const bar = await this.barsService.findOneById(barId);

    if (user.id !== bar.ownedBy.toString()) {
      return response.code(StatusCodes.FORBIDDEN).send();
    }

    const doesBarHaveMenu = bar.menu.some(
      (menu) => menu._id.toString() === barMenuId,
    );

    if (!doesBarHaveMenu) {
      return response.code(StatusCodes.NOT_FOUND).send();
    }

    const barMenu = await this.barsService.findBarMenuById(barMenuId);

    bar.menu.pull({ _id: barMenuId });

    await Promise.all([await bar.save(), await barMenu.deleteOne()]);

    return response.code(StatusCodes.OK).send();
  }

  @Put('/:barId/menu/:barMenuId')
  async editBarMenu(
    @Req() request,
    @Res() response,
    @Param('barId') barId,
    @Param('barMenuId') barMenuId,
    @Body() updateBarMenuDto: UpdateBarMenuDto,
  ) {
    const user = request.user;
    const bar = await this.barsService.findOneById(barId);

    if (user.id !== bar.ownedBy.toString()) {
      return response.code(StatusCodes.FORBIDDEN).send();
    }

    const doesBarHaveMenu = bar.menu.some(
      (menu) => menu._id.toString() === barMenuId,
    );

    if (!doesBarHaveMenu) {
      return response.code(StatusCodes.NOT_FOUND).send();
    }

    const barMenu = await this.barsService
      .findBarMenuById(barMenuId)
      .populate('beers');

    barMenu.beers.forEach((beerPrice) => {
      const updatedBeer = updateBarMenuDto.beers.find(
        (updatedBeerPrice) => updatedBeerPrice._id === beerPrice._id.toString(),
      );

      beerPrice.price = updatedBeer.price;
      beerPrice.save();
    });

    await barMenu.save();

    return response.code(StatusCodes.OK).send();
  }

  @Get()
  @Public()
  findAllBars(@Query('sortBy') sortByKey: SortByType = SortByType.BEST) {
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
  findOneBarById(@Param('id') id: string) {
    return this.barsService.findOneById(id);
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
