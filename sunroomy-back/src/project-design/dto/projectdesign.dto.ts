import { IsNotEmpty, Matches } from "class-validator"

export class CreateProjectDesignDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}

export class UpdateProjectDesignDto {
  title: string
  description: string
}