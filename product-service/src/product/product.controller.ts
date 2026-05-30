import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}