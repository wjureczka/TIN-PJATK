import { Injectable } from '@nestjs/common';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SchemaTypes } from 'mongoose';
import { Bar, BarDocument } from './entities/bar.schema';
import { BarMenu, BarMenuDocument } from './entities/barMenu.schema';
import { BeerPrice, BeerPriceDocument } from './entities/beerPrice.schema';

@Injectable()
export class BarsService {
  constructor(
    @InjectModel(Bar.name) private barModel: Model<BarDocument>,
    @InjectModel(BarMenu.name) private barMenuModel: Model<BarMenuDocument>,
    @InjectModel(BeerPrice.name)
    private beerPriceModel: Model<BeerPriceDocument>,
  ) {}

  create(createBarDto: CreateBarDto) {
    const bar = new this.barModel(createBarDto);

    return bar.save();
  }

  createBarMenu() {
    const barMenu = new this.barMenuModel({
      bar: '5fd60eb35a6c643ccebd7efe',
      manufacturer: '5fd60085d325e52edb588f76',
      beers: [],
    });

    return barMenu.save();
  }

  findAll({ limit = 10, page = 1 }) {
    return this.barModel.find();
  }

  findAllWithSort({
    limit = 10,
    page = 1,
    sortBy = { thumbsUp: 'desc' },
  }: {
    limit: number;
    page: number;
    sortBy: Partial<Record<keyof Bar, string>>;
  }) {
    // @todo use Model.aggregate
    return this.barModel
      .find()
      .sort(sortBy)
      .skip(page === 1 ? 0 : limit * page)
      .limit(limit);
  }

  async findOne(id: string) {
    return this.barModel.findById(id).populate({
      path: 'menu',
      populate: [
        { path: 'manufacturer' },
        { path: 'beers', populate: { path: 'beer' } },
      ],
    });
  }

  async update(id: string, updateBarDto: UpdateBarDto) {
    const modifiedBar = await this.barModel.findOneAndUpdate(
      { _id: id },
      updateBarDto,
    );

    return modifiedBar.save();
  }

  remove(id: string) {
    return this.barModel.deleteOne({ _id: id });
  }
}
