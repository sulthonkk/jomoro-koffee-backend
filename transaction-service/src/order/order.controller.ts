import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Role('CUSTOMER')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Get current user orders' })
  @Get()
  getOrders(@Request() req) {
    return this.orderService.getOrders(req.user.id);
  }

  @ApiOperation({ summary: 'Checkout and create order' })
  @Post('checkout')
  checkout(@Request() req) {
    return this.orderService.checkout(req.user.id);
  }
}