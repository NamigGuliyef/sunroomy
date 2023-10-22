import { IsNotEmpty } from "class-validator"

export class createSpecificationDto {
  @IsNotEmpty({message:'Key is empty'})
  key: string
  @IsNotEmpty({message:'Value is empty'})
  value: string
}


export class updateSpecificationDto {
  @IsNotEmpty({message:'Key is empty'})
  key: string
  @IsNotEmpty({message:'Value is empty'})
  value: string
}