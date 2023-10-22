import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Subproduct {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  description_2: string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'feature', required: true })
  featuresIds: Types.ObjectId
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'specification', required: true })
  specifications: Types.ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true })
  productId: Types.ObjectId
}

export const subProductModel = SchemaFactory.createForClass(Subproduct)
