import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class createSubProductDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
  @IsNotEmpty({ message: 'Description 2 is empty' })
  description_2: string;
  @IsNotEmpty()
  productId: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  customId: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  placementId: mongoose.Schema.Types.ObjectId;
}

export class updateSubProductDto {
  title: string;
  description: string;
  description_2: string;
  productId: mongoose.Schema.Types.ObjectId;
  customId: mongoose.Schema.Types.ObjectId;
  placementId: mongoose.Schema.Types.ObjectId;
}
