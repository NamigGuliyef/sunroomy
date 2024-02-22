import { IsNotEmpty } from 'class-validator';

export class CreateHomepageHeroDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  link: string;
}


export class UpdateHomepageHeroDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  link: string;
}
