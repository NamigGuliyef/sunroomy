import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ProjectDesign {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type:[mongoose.Schema.Types.ObjectId], ref:'projectdesigndetail' })
  design_details:Types.ObjectId
}

export const ProjectDesignModel = SchemaFactory.createForClass(ProjectDesign);
