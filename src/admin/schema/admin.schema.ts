import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true, versionKey: false })
export class Admin {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  surname: string
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
}

export const adminModel = SchemaFactory.createForClass(Admin)

