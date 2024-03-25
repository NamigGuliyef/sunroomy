import { IsNotEmpty, IsOptional } from "class-validator"
export class createSubproductCustomDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}

export class updateSubproductCustomDto {
  @IsOptional()
  title: string
  @IsOptional()
  description: string
}
