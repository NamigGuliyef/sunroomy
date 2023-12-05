import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })

export class RequestProject {
  @Prop({ required: true })
  first_name: string
  @Prop({ required: true })
  last_name: string
  @Prop({ required: true })
  phone_number: string
  @Prop({ required: true })
  email: string
  @Prop({ required: true })
  country: string
  @Prop({ required: true })
  state: string
  @Prop({ required: true })
  city: string
  @Prop({ required: true })
  zipcode: number
  @Prop({ required: true })
  main_structure_model: string
  @Prop({ required: true })
  width_in_feet: number
  @Prop({ required: true })
  projection_in_feet: number
  @Prop({ required: true })
  height_in_feet: number
  @Prop({ required: true })
  structure_situation: string
  @Prop({ required: true })
  structure_color: string

}