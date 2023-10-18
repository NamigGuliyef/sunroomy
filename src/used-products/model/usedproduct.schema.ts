import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UsedProducts {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
}

export const usedProductsModel=SchemaFactory.createForClass(UsedProducts)
