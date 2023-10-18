import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Application {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
  @Prop()
  photos: string[]
}

export const applicationModel = SchemaFactory.createForClass(Application)
