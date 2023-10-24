import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })

export class Specification {
  @Prop({ required: true })
  key: string
  @Prop({ required: true })
  value: string
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'subproduct',required:true})
  subProductId:Types.ObjectId
}

export const specificationModel=SchemaFactory.createForClass(Specification)
