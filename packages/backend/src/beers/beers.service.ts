import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Manufacturer,
  ManufacturerDocument,
} from './entities/manufacturer.schema';
import { Model } from 'mongoose';
import { Beer, BeerDocument } from './entities/beer.schema';
import {CreateBeerDto} from "./dto/create-beer.dto";

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

  updateManufacturer(id: string, updateBeerDto: UpdateManufacturerDto) {
    return this.manufacturerModel.findOneAndUpdate({ _id: id }, { ...updateBeerDto });
  }

  updateBeer(id: string, updateBeerDto: UpdateManufacturerDto) {
    return this.beerModel.findOneAndUpdate({ _id: id }, { ...updateBeerDto });
  }

  createBeer(manufacturerId: string, createBeerDto: CreateBeerDto) {
    const newBeer = new this.beerModel({
      name: createBeerDto.name,
      alcoholContent: createBeerDto.alcoholContent,
      producedBy: manufacturerId,
    });

    return newBeer.save()
  }

  remove(id: number) {
    return `This action removes a #${id} beer`;
  }
}
