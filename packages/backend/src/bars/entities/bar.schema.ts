import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { BarMenu } from './barMenu.schema';

type BarDocument = Bar & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class Bar {
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 0 })
  thumbsUp: number;

  @Prop({ default: 0 })
  thumbsDown: number;

  @Prop()
  coverPhoto: string;

  @Prop({ required: true })
  operatingSinceDate: Date;

  @Prop({ required: true, default: false })
  isAcceptedByAdmin: boolean;

  @Prop({
    required: true,
    default: [],
    type: [{ type: SchemaTypes.ObjectId, ref: 'BarMenu' }],
  })
  menu: BarMenu[];
}

const BarSchema = SchemaFactory.createForClass(Bar);

export { Bar, BarDocument, BarSchema };
