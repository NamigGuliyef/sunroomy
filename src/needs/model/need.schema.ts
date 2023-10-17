import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";

@Schema({ timestamps: true, versionKey: false })
export class ProjectNeed {
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  description: string
}

export const projectNeedModel = SchemaFactory.createForClass(ProjectNeed)
