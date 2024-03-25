import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class subproductCustom {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'subproduct_customItem' })
  itemIds: Types.ObjectId
}

export const subproductCustomModel = SchemaFactory.createForClass(subproductCustom)
