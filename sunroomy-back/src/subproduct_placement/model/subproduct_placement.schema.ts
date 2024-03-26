import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class subproductPlacement {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'subproduct_placementItem' })
  itemIds: Types.ObjectId
}

export const subproductPlacementModel = SchemaFactory.createForClass(subproductPlacement)
