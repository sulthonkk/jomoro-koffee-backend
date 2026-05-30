import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':categoryId/products')
  findProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.findProductsByCategory(categoryId);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }
}