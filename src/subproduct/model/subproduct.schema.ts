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
  @Prop()
  photos: string[]
  @Prop()
  slug:string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'feature'})
  featuresIds: Types.ObjectId
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'specification'})
  specifications: Types.ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true })
  productId: Types.ObjectId
  
}

export const subProductModel = SchemaFactory.createForClass(Subproduct)
