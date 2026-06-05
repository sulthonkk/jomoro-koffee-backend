import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      include: { order_details: true },
    });
  }

  async checkout(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { cart_items: true },
    });

    if (!cart || cart.cart_items.length === 0) {
      return { message: 'Cart is empty' };
    }

    const order = await this.prisma.order.create({
      data: { user_id: userId },
    });

    for (const item of cart.cart_items) {
      const productRes = await fetch(`http://localhost:3002/products/${item.product_id}`);
      const product = await productRes.json();

      await this.prisma.orderDetail.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          price: product.price,
          quantity: item.quantity,
        },
      });
    }

    await this.prisma.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    return { message: 'Checkout success', order_id: order.id };
  }
}