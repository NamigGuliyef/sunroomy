import { IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateSubproductCustomItemDto {
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  subproductCustomId: mongoose.Schema.Types.ObjectId
}


export class UpdateSubproductCustomItemDto {
  @IsOptional()
  description: string
  @IsOptional()
  subproductCustomId: mongoose.Schema.Types.ObjectId
}
