import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, SchemaTypes} from 'mongoose';
import {Bar, BarSchema} from '../../bars/entities/bar.schema';

type UserDocument = User & Document;

@Schema()
class User {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  refresh_token?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserDocument, UserSchema };