import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Bar, BarSchema } from '../../bars/entities/bar.schema';

type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  refresh_token?: string;

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({
    required: false,
    default: [],
    type: [{ type: SchemaTypes.ObjectId, ref: 'Bar' }],
  })
  ownedBars: Bar[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserDocument, UserSchema };
