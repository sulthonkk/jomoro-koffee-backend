import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/)
  first_name: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/)
  last_name: string;

  @IsEmail()
  @Matches(/\.(com|net|org|id)$/)
  email: string;

  @MinLength(8)
  password: string;
}