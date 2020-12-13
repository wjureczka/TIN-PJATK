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
import { CreateBeerDto } from './dto/create-beer.dto';

@Injectable()
export class BeersService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<ManufacturerDocument>,
    @InjectModel(Beer.name)
    private beerModel: Model<BeerDocument>,
  ) {}

  async createExample() {
    const manufacturer = await new this.manufacturerModel({
      name: `Example ${new Date().toUTCString()}`,
      beers: [],
    });

    const beer = await new this.beerModel({
      name: 'Example beer',
      alcoholContent: '5%',
      producedBy: manufacturer._id,
    });

    manufacturer.beers.push(beer);

    await beer.save();
    await manufacturer.save();

    return manufacturer.populate('beers');
  }

  findAll() {
    return this.manufacturerModel.find().populate('beers');
  }

  findOne(id: number) {
    return `This action returns a #${id} beer`;
  }

  updateManufacturer(id: string, updateBeerDto: UpdateManufacturerDto) {
    return this.manufacturerModel.findOneAndUpdate(
      { _id: id },
      { ...updateBeerDto },
    );
  }

  updateBeer(id: string, updateBeerDto: UpdateManufacturerDto) {
    return this.beerModel.findOneAndUpdate({ _id: id }, { ...updateBeerDto });
  }

  async createBeer(manufacturerId: string, createBeerDto: CreateBeerDto) {
    const newBeer = new this.beerModel({
      name: createBeerDto.name,
      alcoholContent: createBeerDto.alcoholContent,
      producedBy: manufacturerId,
    });

    const manufacturer = await this.manufacturerModel.findByIdAndUpdate(
      manufacturerId,
      {
        $addToSet: {
          beers: newBeer,
        },
      },
    );

    return manufacturer.save() && newBeer.save();
  }

  async remove(id: string) {
    const manufacturer = await this.manufacturerModel
      .findById(id)
      .populate('beers');

    await this.beerModel.deleteMany({ producedBy: manufacturer._id });

    await manufacturer.deleteOne();

    return;
  }
}
