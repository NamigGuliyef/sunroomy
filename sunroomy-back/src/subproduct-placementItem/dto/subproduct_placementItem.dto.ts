import { IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateSubproductPlacementItemDto {
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  subproductPlacementId: mongoose.Schema.Types.ObjectId
}


export class UpdateSubproductPlacementItemDto {
  @IsOptional()
  description: string
  @IsOptional()
  subproductPlacementId: mongoose.Schema.Types.ObjectId
}
