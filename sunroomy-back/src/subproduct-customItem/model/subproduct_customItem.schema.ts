import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class subproductCustomItem {
  @Prop({ required: true })
  photo: string
  @Prop({ required: true })
  description: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'subproduct_custom' })
  subproductCustomId: Types.ObjectId
}

export const subproductCustomItemModel = SchemaFactory.createForClass(subproductCustomItem)
