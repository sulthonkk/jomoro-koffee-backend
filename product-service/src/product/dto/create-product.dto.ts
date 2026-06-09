import { IsNotEmpty, IsString, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Espresso Shot' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Strong and bold espresso' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: 25000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 50 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  category_id!: number;
}