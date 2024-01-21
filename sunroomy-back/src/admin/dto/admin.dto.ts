import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class updateAdminDto {
  @IsNotEmpty()
  @Matches(new RegExp("^[A-Za-z]{3,15}$"))
  name: string
  @IsNotEmpty()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
  surname: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @Length(8, 16)
  password: string
}

