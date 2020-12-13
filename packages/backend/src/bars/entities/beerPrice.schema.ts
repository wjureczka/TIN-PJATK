import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Beer } from '../../beers/entities/beer.schema';

type BeerPriceDocument = BeerPrice & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class BeerPrice {
  _id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Beer' })
  beer: Beer;

  @Prop({ required: true })
  price: number;
}

const BeerPriceSchema = SchemaFactory.createForClass(BeerPrice);

export { BeerPrice, BeerPriceSchema, BeerPriceDocument };
