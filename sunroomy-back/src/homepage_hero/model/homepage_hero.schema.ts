import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class HomepageHero {
  @Prop()
  photo: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  link: string;
  @Prop({ required: true })
  subtitle: string;
}

export const HomepageHeroModel = SchemaFactory.createForClass(HomepageHero);
