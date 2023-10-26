import { IsNotEmpty } from "class-validator"

export class createProductDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string
  @IsNotEmpty({ message: 'Description is empty' })
  description: string
}


export class updateProductDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string
  @IsNotEmpty({ message: 'Description is empty' })
  description: string
}
