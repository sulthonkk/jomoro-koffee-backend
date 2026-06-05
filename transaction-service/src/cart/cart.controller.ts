import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Role('CUSTOMER')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  addToCart(@Request() req, @Body() body: AddCartDto) {
    return this.cartService.addToCart(req.user.id, body);
  }

  @Delete(':cartItemId')
  removeFromCart(@Request() req, @Param('cartItemId', ParseIntPipe) cartItemId: number) {
    return this.cartService.removeFromCart(req.user.id, cartItemId);
  }
}