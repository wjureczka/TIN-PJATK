import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Public } from '../auth/public.decorator';
import {UpdateBeerDto} from "./dto/update-beer.dto";
import {CreateBeerDto} from "./dto/create-beer.dto";

@Controller('manufacturers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post()
  create(@Body() createBeerDto: CreateManufacturerDto) {
    // return this.beersService.create(createBeerDto);
  }

  @Post('/createExample')
  @Public()
  createExample() {
    return this.beersService.createExample();
  }

  @Get()
  @Public()
  findAll() {
    return this.beersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(+id);
  }

  @Put(':id')
  @Public()
  updateManufacturer(@Param('id') id: string, @Body() updateBeerDto: UpdateManufacturerDto) {
    return this.beersService.updateManufacturer(id, updateBeerDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.beersService.remove(id);
  }

  @Put('/beers/:id')
  @Public()
  updateBeer(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.updateBeer(id, updateBeerDto);
  }

  @Post(':manufacturerId/beers')
  @Public()
  createBeer(@Param('manufacturerId') manufacturerId: string, @Body() createBeerDto: CreateBeerDto) {
    return this.beersService.createBeer(manufacturerId, createBeerDto);
  }
}
