import { Injectable } from '@nestjs/common';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SchemaTypes } from 'mongoose';
import { Bar, BarDocument } from './entities/bar.schema';
import { BarMenu, BarMenuDocument } from './entities/barMenu.schema';
import { BeerPrice, BeerPriceDocument } from './entities/beerPrice.schema';
import { CreateBarMenuDto } from './dto/create-bar-menu.dto';

@Injectable()
export class BarsService {
  constructor(
    @InjectModel(Bar.name) private barModel: Model<BarDocument>,
    @InjectModel(BarMenu.name) private barMenuModel: Model<BarMenuDocument>,
    @InjectModel(BeerPrice.name)
    private beerPriceModel: Model<BeerPriceDocument>,
  ) {}

  createBar(createBarDto: CreateBarDto, ownerId: string) {
    const bar = new this.barModel({...createBarDto, ownedBy: ownerId });
    return bar.save();
  }

  async createBarMenu(barId: string, createBarMenuDto: CreateBarMenuDto) {
    const bar = await this.barModel.findById(barId);

    const beers = await this.beerPriceModel.insertMany(
      createBarMenuDto.beers.map((beer) => ({
        price: beer.price,
        beer: beer.beerId,
      })),
    );

    const barMenu = await new this.barMenuModel({
      manufacturer: createBarMenuDto.manufacturerId,
      beers,
    });

    await barMenu.save();

    await bar.menu.push(barMenu);

    return bar.save();
  }

  public findBarMenuById(barId: string) {
    return this.barMenuModel.findById(barId);
  }

  public findAllWithSort({
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

  async findOneById(id: string) {
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
