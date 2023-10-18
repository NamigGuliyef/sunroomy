import { IsNotEmpty, Matches } from 'class-validator';

export class createUsedProductsDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @Matches(new RegExp('^[A-Z a-z-]{3,100}$'))
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
}


export class updateUsedProductsDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @Matches(new RegExp('^[A-Z a-z-]{3,100}$'))
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
}

