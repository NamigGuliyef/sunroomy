import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class CreateRequestProject {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-züöğıəçşÜÖĞIƏÇŞ]{3,30}$'))
  first_name: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-züöğıəçşÜÖĞIƏÇŞ]{3,30}$'))
  last_name: string;
  @IsNotEmpty()
  @IsMobilePhone()
  @IsPhoneNumber()
  phone_number: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-züöğıəçşÜÖĞIƏÇŞ ]{3,50}$'))
  country: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-züöğıəçşÜÖĞIƏÇŞ ]{3,50}$'))
  state: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-züöğıəçşÜÖĞIƏÇŞ ]{3,50}$'))
  city: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9 ]{3,50}$'))
  zipcode: number;
  @IsNotEmpty()
  main_structure_model: string;
  @IsNotEmpty()
  width_in_feet: number;
  @IsNotEmpty()
  projection_in_feet: number;
  @IsNotEmpty()
  height_in_feet: number;
  @IsNotEmpty()
  structure_situation: string;
  @IsNotEmpty()
  structure_color: string;
  @IsNotEmpty() // Note: Give them only 3 chosen products below
  window_and_doors: [string];
  @IsNotEmpty() // Note: They can choose all products below
  sunscreens: [string];
  @IsNotEmpty()
  project_details: string;
  @IsNotEmpty()
  about_us: string;
}
