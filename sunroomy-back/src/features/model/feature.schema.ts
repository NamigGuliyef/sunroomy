import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Feature {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  icon: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'subproduct' })
  subProductId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'project' })
  projectId: Types.ObjectId;
}

export const featureModel = SchemaFactory.createForClass(Feature);
