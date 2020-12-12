import { Injectable } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Manufacturer,
  ManufacturerDocument,
} from './entities/manufacturer.schema';
import { Model } from 'mongoose';
import { Beer, BeerDocument } from './entities/beer.schema';

@Injectable()
export class BeersService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<ManufacturerDocument>,
    @InjectModel(Beer.name)
    private beerModel: Model<BeerDocument>,
  ) {}

  async createExample() {
    const beer = await new this.beerModel({
      name: 'Example beer',
      alcoholContent: '5%',
    });

    const manufacturer = await new this.manufacturerModel({
      name: `Example ${new Date().toUTCString()}`,
      beers: [beer],
    });

    return Promise.all([beer.save(), manufacturer.save()]);
  }

  findAll() {
    return this.manufacturerModel.find().populate('beers');
  }

  findOne(id: number) {
    return `This action returns a #${id} beer`;
  }

  update(id: number, updateBeerDto: UpdateBeerDto) {
    return `This action updates a #${id} beer`;
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
