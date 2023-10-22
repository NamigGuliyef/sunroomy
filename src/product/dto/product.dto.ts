import { IsNotEmpty } from "class-validator"
import mongoose from "mongoose"

export class createProductDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string
  @IsNotEmpty({ message: 'Description is empty' })
  description: string
  subProductIds: mongoose.Schema.Types.ObjectId
}


export class updateProductDto {
  @IsNotEmpty({ message: 'Title is empty' })
  title: string
  @IsNotEmpty({ message: 'Description is empty' })
  description: string
  subProductIds: mongoose.Schema.Types.ObjectId
}
