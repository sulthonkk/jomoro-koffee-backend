import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [ProductModule, CategoryModule, PassportModule],
  providers: [JwtStrategy, RolesGuard, Reflector],
})
export class AppModule {}