import { IsNotEmpty } from "class-validator";

export class createApplicationDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string
  @IsNotEmpty({ message: 'Description is empty' })
  description: string
}
