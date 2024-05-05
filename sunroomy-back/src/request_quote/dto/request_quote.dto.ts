import { IsNotEmpty, Matches } from 'class-validator';

export class RequestQuoteDto {
  @IsNotEmpty({ message: 'Title is not empty' })
  @Matches(new RegExp('^[A-Za-z? .,!-/]{3,100}$'))
  title: string;
  @IsNotEmpty({ message: 'Description is not empty' })
  description: string;
}
