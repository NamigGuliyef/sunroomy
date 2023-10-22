import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })

export class Specification {
  @Prop({ required: true })
  key: string
  @Prop({ required: true })
  value: string
}

export const specificationModel=SchemaFactory.createForClass(Specification)
