import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class createAboutOutdorrDto {
  @IsNotEmpty({ message: 'Key is empty' })
  key: string;
  @IsNotEmpty({ message: 'Value is empty' })
  value: string;
  @IsNotEmpty()
  why_outdorr: mongoose.Schema.Types.ObjectId;
}

export class updateAboutOutdorrDto {
  @IsNotEmpty({ message: 'Key is empty' })
  key: string;
  @IsNotEmpty({ message: 'Value is empty' })
  value: string;
}
