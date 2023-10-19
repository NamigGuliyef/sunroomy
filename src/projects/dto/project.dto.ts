import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class createProjectDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string;
  @IsNotEmpty({ message: 'Location is empty' })
  location: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
  @IsNotEmpty()
  needsId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  featuresId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  usedProductsId: mongoose.Schema.Types.ObjectId;
}


export class updateProjectDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string;
  @IsNotEmpty({ message: 'Location is empty' })
  location: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
  @IsNotEmpty()
  needsId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  featuresId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  usedProductsId: mongoose.Schema.Types.ObjectId;
}