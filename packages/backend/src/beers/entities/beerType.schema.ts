import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

type BeerDocument = BeerType & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class BeerType {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;
}

const BeerTypeSchema = SchemaFactory.createForClass(BeerType);

export { BeerTypeSchema, BeerType, BeerDocument };
