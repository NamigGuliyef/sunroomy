import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class createContactDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @Matches(new RegExp("^[A-Za-z0-9,. -üöğıəçşÜÖĞIƏÇŞ]{10,200}$"))
  title: string;
  @IsNotEmpty({ message: 'Location is empty' })
  @Matches(new RegExp("^[A-Za-z0-9,. -üöğıəçşÜÖĞIƏÇŞ]{10,200}$"))
  location: string;
  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Phone is empty' })
  @IsPhoneNumber()
  @IsMobilePhone()
  phone: string;
  @IsNotEmpty({ message: 'Maplink is empty' })
  mapLink: string;
}


export class updateContactDto {
    @IsNotEmpty({ message: 'Title is empty' })
    @Matches(new RegExp("^[A-Za-z0-9,. -üöğıəçşÜÖĞIƏÇŞ]{10,200}$"))
    title: string;
    @IsNotEmpty({ message: 'Location is empty' })
    @Matches(new RegExp("^[A-Za-z0-9,. -üöğıəçşÜÖĞIƏÇŞ]{10,200}$"))
    location: string;
    @IsNotEmpty({ message: 'Email is empty' })
    @IsEmail()
    email: string;
    @IsNotEmpty({ message: 'Phone is empty' })
    @IsPhoneNumber()
    @IsMobilePhone()
    phone: string;
    @IsNotEmpty({ message: 'Maplink is empty' })
    mapLink: string;
  }

  