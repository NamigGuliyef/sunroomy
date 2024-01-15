import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class LetUs_Inspire_You {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  photos: string[];
}

export const LetUs_Inspire_YouModel = SchemaFactory.createForClass(LetUs_Inspire_You);
