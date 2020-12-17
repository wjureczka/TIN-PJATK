import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete, UseGuards, Res,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Public } from '../auth/public.decorator';
import {UpdateBeerDto} from "./dto/update-beer.dto";
import {CreateBeerDto} from "./dto/create-beer.dto";
import { AdminGuard } from '../auth/admin.guard';
import {StatusCodes} from "http-status-codes";
import {Manufacturer, ManufacturerDocument} from "./entities/manufacturer.schema";

@Controller('manufacturers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post('/createExample')
  @UseGuards(AdminGuard)
  createExample() {
    return this.beersService.createExample();
  }

  @Get()
  findAll() {
    return this.beersService.findAll();
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  updateManufacturer(@Param('id') id: string, @Body() updateBeerDto: UpdateManufacturerDto) {
    return this.beersService.updateManufacturer(id, updateBeerDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.beersService.deleteManufacturer(id);
  }

  @Put('/beers/:id')
  @UseGuards(AdminGuard)
  updateBeer(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.updateBeer(id, updateBeerDto);
  }

  @Post(':manufacturerId/beers')
  @UseGuards(AdminGuard)
  async createBeer(@Res() res, @Param('manufacturerId') manufacturerId: string, @Body() createBeerDto: CreateBeerDto) {
    const manufacturer = await this.beersService.findManufacturer(manufacturerId).populate('beers');

    if(!manufacturer) {
      return res.code(StatusCodes.NOT_FOUND).send();
    }

    const doesBeerAlreadyExists = manufacturer.beers.some((beer) => beer.name === createBeerDto.name);

    if(doesBeerAlreadyExists) {
      return res.code(StatusCodes.CONFLICT).send();
    }

    const newBeer = await this.beersService.createBeer(manufacturerId, createBeerDto);

    manufacturer.beers.push(newBeer);

    await manufacturer.save();

    return res.code(StatusCodes.CREATED).send(newBeer);
  }

  @Delete(':manufacturerId/beers/:beerId')
  @UseGuards(AdminGuard)
  async deleteBeer(@Param('manufacturerId') manufacturerId: string, @Param('beerId') beerId) {
    return this.beersService.deleteBeer(manufacturerId, beerId);
  }
}
