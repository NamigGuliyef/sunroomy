import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class AboutOutdorr {
  @Prop({ required: true })
  key: string;
  @Prop({ required: true })
  value: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'whyoutdorr', required:true })
  why_outdorr: Types.ObjectId;
}

export const aboutOutdorrModel = SchemaFactory.createForClass(AboutOutdorr);
