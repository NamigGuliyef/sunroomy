import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class createSpecificationDto {
  @IsNotEmpty({ message: 'Key is empty' })
  key: string;
  @IsNotEmpty({ message: 'Value is empty' })
  value: string;
  @IsNotEmpty()
  subProductId: mongoose.Schema.Types.ObjectId;
}

export class updateSpecificationDto {
  key: string;
  value: string;
  subProductId: mongoose.Schema.Types.ObjectId;
}
