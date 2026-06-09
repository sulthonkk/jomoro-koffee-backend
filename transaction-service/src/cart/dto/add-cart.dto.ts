import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id!: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity!: number;
}