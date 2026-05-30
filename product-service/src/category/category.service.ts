import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findProductsByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { category_id: categoryId },
    });
  }

  async create(name: string) {
    return this.prisma.category.create({
      data: { name },
    });
  }
}