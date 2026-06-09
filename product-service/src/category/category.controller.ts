import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Create new category' })
  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @ApiOperation({ summary: 'Get products by category' })
  @Get(':categoryId/products')
  findProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.findProductsByCategory(categoryId);
  }
}