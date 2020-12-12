import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Manufacturer } from './manufacturer.schema';

type BeerDocument = Beer & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class Beer {
  _id: string;

  // @todo create unique subdocumen within Manufacturer schema
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Manufacturer', required: true })
  producedBy: Manufacturer

  @Prop({ required: true, validate: (schema) => { console.log(schema); return schema;}})
  name: string;

  @Prop({ required: true })
  alcoholContent: string;
}

const BeerSchema = SchemaFactory.createForClass(Beer);

BeerSchema.pre('validate', () => {

});

export { Beer, BeerSchema, BeerDocument };
