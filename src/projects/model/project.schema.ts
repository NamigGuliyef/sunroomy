import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Project {
  @Prop({ required: true })
  type: string
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  used_products_joint: string
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photos: string[];
  @Prop()
  slug: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'projectneed' })
  needsId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'feature' })
  featuresId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'usedproducts' })
  usedProductsId: Types.ObjectId;
}

export const projectModel = SchemaFactory.createForClass(Project);
