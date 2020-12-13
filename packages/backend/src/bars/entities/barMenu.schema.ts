import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Manufacturer } from '../../beers/entities/manufacturer.schema';
import { BeerPrice } from './beerPrice.schema';

type BarMenuDocument = BarMenu & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class BarMenu {
  _id: string;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'Manufacturer',
  })
  manufacturer: Manufacturer;

  @Prop({
    required: true,
    default: [],
    type: [{ type: SchemaTypes.ObjectId, ref: BeerPrice.name }],
  })
  beers: BeerPrice[];
}

const BarMenuSchema = SchemaFactory.createForClass(BarMenu);

export { BarMenu, BarMenuSchema, BarMenuDocument };
