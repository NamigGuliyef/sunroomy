import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  photo: string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'subproduct' })
  subProductIds: Types.ObjectId
}

export const productModel = SchemaFactory.createForClass(Product)
