import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RequestQuote {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  cover_photo: string;
}

export const RequestQuoteModel = SchemaFactory.createForClass(RequestQuote);
