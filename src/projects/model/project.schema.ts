import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Project {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photos: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'projectneed' })
  needsId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'feature' })
  featuresId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'usedproduct' })
  usedProductsId: Types.ObjectId;
}

export const projectModel = SchemaFactory.createForClass(Project);
