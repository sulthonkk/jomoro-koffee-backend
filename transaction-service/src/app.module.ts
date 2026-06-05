import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [CartModule, OrderModule, PassportModule],
  providers: [JwtStrategy, RolesGuard, Reflector],
})
export class AppModule {}