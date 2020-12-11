import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Beer } from './beer.schema';

type ManufacturerDocument = Manufacturer & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class Manufacturer {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Beer' }] })
  beers: Beer[];
}

const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);

export { Manufacturer, ManufacturerSchema, ManufacturerDocument };
