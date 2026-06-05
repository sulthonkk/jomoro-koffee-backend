import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Role('CUSTOMER')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(@Request() req) {
    return this.orderService.getOrders(req.user.id);
  }

  @Post('checkout')
  checkout(@Request() req) {
    return this.orderService.checkout(req.user.id);
  }
}