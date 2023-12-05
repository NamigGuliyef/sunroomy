import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })

export class ProjectDesign {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
}

export const ProjectDesignModel = SchemaFactory.createForClass(ProjectDesign)