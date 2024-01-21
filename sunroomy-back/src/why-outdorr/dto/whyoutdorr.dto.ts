import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class createWhyOutdorrDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
}

export class updateWhyOutdorrDto {
  title: string;
  description: string;
}
