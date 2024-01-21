import { IsNotEmpty, Matches } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProjectDesignDetailsDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 ]{3,50}$'))
  step: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  project_design: mongoose.Schema.Types.ObjectId
}

export class UpdateProjectDesignDetailsDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 ]{3,50}$'))
  step: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
