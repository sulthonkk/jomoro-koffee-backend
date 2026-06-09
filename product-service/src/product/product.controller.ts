import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new product (Admin only)' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @ApiOperation({ summary: 'Update product (Admin only)' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete product (Admin only)' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Role('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}