import { IsNotEmpty, Matches } from "class-validator"

export class CreateProjectDesignDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z -/]$'))
  title: string
  @IsNotEmpty()
  description: string
}

export class UpdateProjectDesignDto {
  @Matches(new RegExp('^[A-Za-z -/]$'))
  title: string
  description: string
}