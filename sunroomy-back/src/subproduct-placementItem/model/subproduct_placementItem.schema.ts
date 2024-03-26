import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class subproductPlacementItem {
  @Prop({ required: true })
  photo: string
  @Prop({ required: true })
  description: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'subproduct_placement' })
  subproductPlacementId: Types.ObjectId
}

export const subproductPlacementItemModel = SchemaFactory.createForClass(subproductPlacementItem)
