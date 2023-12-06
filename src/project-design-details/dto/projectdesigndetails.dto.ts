import { IsNotEmpty, Matches } from 'class-validator';

export class CreateProjectDesignDetailsDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 -]$'))
  step: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class UpdateProjectDesignDetailsDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 -]$'))
  step: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
