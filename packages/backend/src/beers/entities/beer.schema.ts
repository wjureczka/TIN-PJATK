import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Manufacturer } from './manufacturer.schema';

type BeerDocument = Beer & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class Beer {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  alcoholContent: string;
}

const BeerSchema = SchemaFactory.createForClass(Beer);

export { Beer, BeerSchema, BeerDocument };
