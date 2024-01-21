import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Contact {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  mapLink: string;
}

export const contactModel = SchemaFactory.createForClass(Contact);
