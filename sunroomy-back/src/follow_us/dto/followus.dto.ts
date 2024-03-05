import { IsNotEmpty, IsString } from 'class-validator';

export class createFollowUsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  link: string;
}


export class updateFollowUsDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    link: string;
  }