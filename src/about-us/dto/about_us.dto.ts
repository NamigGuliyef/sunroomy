import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAboutUsDto {
  @IsNotEmpty({ message: 'Description is not empty' })
  description: string;
  @IsNotEmpty({ message: 'Years of experience is not empty' })
  years_of_experience: number;
  @IsNotEmpty({ message: 'Product systems is not empty' })
  product_systems: number;
  @IsNotEmpty({ message: 'Partners is not empty' })
  partners: number;
}

export class UpdateAboutUsDto {
  @IsOptional({ message: 'Description is not empty' })
  description: string;
  @IsOptional({ message: 'Years of experience is not empty' })
  years_of_experience: number;
  @IsOptional({ message: 'Product systems is not empty' })
  product_systems: number;
  @IsOptional({ message: 'Partners is not empty' })
  partners: number;
}
