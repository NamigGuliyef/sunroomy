import { IsNotEmpty, Matches } from 'class-validator';

export class createHomeAboutUsDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @Matches(new RegExp('^[A-Z a-z-]{3,50}$'))
  title: string;
  @IsNotEmpty({ message: 'Description is empty' })
  description: string;
}

export class updateHomeAboutUsDto {
  @Matches(new RegExp('^[A-Z a-z-]{3,50}$'))
  title: string;
  description: string;
}
