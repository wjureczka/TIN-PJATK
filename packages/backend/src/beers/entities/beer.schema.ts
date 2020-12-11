import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Manufacturer } from './manufacturer.schema';
import { BeerType } from './beerType.schema';

type BeerDocument = Beer & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class Beer {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ required: true })
  alcoholContent: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manufacturer' })
  producedBy: Manufacturer;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'BeerType' })
  type: BeerType;
}

const BeerSchema = SchemaFactory.createForClass(Beer);

export { Beer, BeerSchema, BeerDocument };
