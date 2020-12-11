import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Beer } from '../../beers/entities/beer.schema';
import { Manufacturer } from '../../beers/entities/manufacturer.schema';

type BarMenuDocument = BarMenu & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class BarMenu {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Manufacturer' })
  manufacturer: Manufacturer;

  @Prop({
    required: true,
    default: [],
    type: [{ type: SchemaTypes.ObjectId, ref: 'Beer' }],
  })
  beers: Beer[];
}

const BarMenuSchema = SchemaFactory.createForClass(BarMenu);

export { BarMenu, BarMenuSchema, BarMenuDocument };
