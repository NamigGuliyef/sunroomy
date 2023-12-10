import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import mongoose from 'mongoose';

export class createFeatureDto {
  @IsNotEmpty({ message: 'Type is empty' })
  type: string;
  @IsNotEmpty({ message: 'Title is empty' })
  @Matches(new RegExp('^[A-Z a-z-]{3,50}$'))
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
  @IsOptional()
  subProductId: mongoose.Schema.Types.ObjectId;
}

export class updateFeatureDto {
  type: string;
  @Matches(new RegExp('^[A-Z a-z-]{3,50}$'))
  title: string;
  description: string;
  @IsOptional()
  subProductId: mongoose.Schema.Types.ObjectId;
}
