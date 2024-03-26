import { IsNotEmpty, IsOptional } from "class-validator"
export class createSubproductPlacementDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}

export class updateSubproductPlacementDto {
  @IsOptional()
  title: string
  @IsOptional()
  description: string
}
