import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class aboutUs {
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  years_of_experience: number;
  @Prop({ required: true })
  product_systems: number;
  @Prop({ required: true })
  partners: number;
}

export const aboutUsModel = SchemaFactory.createForClass(aboutUs);
