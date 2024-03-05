import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class FollowUs {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  link: string;
  @Prop({ required: true })
  photo: string;
}

export const followUsModel = SchemaFactory.createForClass(FollowUs);
