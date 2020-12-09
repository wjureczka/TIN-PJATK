import { Injectable } from '@nestjs/common';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bar, BarDocument } from './entities/bar.schema';

@Injectable()
export class BarsService {
  constructor(@InjectModel(Bar.name) private barModel: Model<BarDocument>) {}

  create(createBarDto: CreateBarDto) {
    return new this.barModel(createBarDto).save();
  }

  findAll({ limit = 10, page = 1 }) {
    return this.barModel
      .find()
      .skip(page === 1 ? 0 : limit * page)
      .limit(limit)
  }

  findAllWithSort({ limit = 10, page = 1, sortBy = { thumbsUp: 'desc' }} : { limit: number, page: number, sortBy: Partial<Record<keyof Bar, string>> }) {
    return this.barModel
      .find()
      .sort(sortBy)
      .skip(page === 1 ? 0 : limit * page)
      .limit(limit)
  }

  findOne(id: string) {
    return this.barModel.findById(id);
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
