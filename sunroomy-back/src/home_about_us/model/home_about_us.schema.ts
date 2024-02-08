import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";

@Schema({ timestamps: true, versionKey: false })
export class HomeAboutUs {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
}

export const homeAboutUsModel = SchemaFactory.createForClass(HomeAboutUs)
