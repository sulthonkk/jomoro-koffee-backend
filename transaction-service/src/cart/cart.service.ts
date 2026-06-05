import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartDto } from './dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { cart_items: true },
    });
    return cart ?? { message: 'Cart is empty' };
  }

  async addToCart(userId: number, data: AddCartDto) {
    // Cek product exist di product-service
    const productRes = await fetch(`http://localhost:3002/products/${data.product_id}`);
    const product = await productRes.json();

    if (!product || !product.id) {
      return { message: 'Product not found' };
    }

    if (product.stock < data.quantity) {
      return { message: 'Insufficient stock' };
    }

    // Cari atau buat cart
    let cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { user_id: userId },
      });
    }

    // Cek apakah product sudah ada di cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cart.id, product_id: data.product_id },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + data.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cart_id: cart.id,
          product_id: data.product_id,
          quantity: data.quantity,
        },
      });
    }

    return { message: 'Product added to cart' };
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) return { message: 'Cart not found' };

    await this.prisma.cartItem.delete({
      where: { id: cartItemId, cart_id: cart.id },
    });

    return { message: 'Item removed from cart' };
  }
}