import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class createProjectDto {
  @IsNotEmpty({ message: 'Type is empty' })
  type: string;
  @IsNotEmpty({ message: 'Title is empty' })
  title: string;
  @IsNotEmpty({ message: 'Location is empty' })
  location: string;
  @IsNotEmpty({ message: 'Used products joint is empty' })
  used_products_joint: string;
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
  type: string;
  title: string;
  location: string;
  used_products_joint: string;
  description: string;
  needsId: mongoose.Schema.Types.ObjectId;
  featuresId: mongoose.Schema.Types.ObjectId;
  usedProductsId: mongoose.Schema.Types.ObjectId;
}
