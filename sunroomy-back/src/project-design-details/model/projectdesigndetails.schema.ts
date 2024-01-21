import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ProjectDesignDetails {
  @Prop({ required: true })
  step: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photo: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'projectdesign' })
  project_design: Types.ObjectId
}

export const ProjectDesignDetailsModel = SchemaFactory.createForClass(ProjectDesignDetails)