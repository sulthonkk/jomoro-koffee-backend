import { IsString, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Espresso Shot', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Strong and bold espresso', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 25000, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  category_id?: number;
}