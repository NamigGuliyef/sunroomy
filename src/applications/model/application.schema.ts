import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Application {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop()
  photos: string[]
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'subproduct', required: true })
  subProductId: Types.ObjectId
}

export const applicationModel = SchemaFactory.createForClass(Application)
