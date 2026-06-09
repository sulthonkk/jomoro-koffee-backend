import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Budi' })
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, { message: 'First name must contain letters only' })
  first_name!: string;

  @ApiProperty({ example: 'Sodiqin' })
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, { message: 'Last name must contain letters only' })
  last_name!: string;

  @ApiProperty({ example: 'budi@gmail.com' })
  @IsEmail()
  @Matches(/\.(com|net|org|id)$/, { message: 'Email must end with .com, .net, .org, or .id' })
  email!: string;

  @ApiProperty({ example: 'password12' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^\S+$/, { message: 'Password cannot contain spaces' })
  @Matches(/^(?=(?:\D*\d){2})/, { message: 'Password must contain at least 2 numeric digits' })
  password!: string;
}