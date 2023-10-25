import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class WhyOutdorr {
  @Prop({required:true})
  title: string;
  @Prop({required:true})
  description: string;
  @Prop({type:[mongoose.Schema.Types.ObjectId], ref:'aboutOutdorr',required:true})
  about_outdorr: Types.ObjectId;
}
export const whyOutdorrModel = SchemaFactory.createForClass(WhyOutdorr);
