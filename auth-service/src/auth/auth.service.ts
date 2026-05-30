import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { message: 'Email already exists' };
    }

    const user = await this.prisma.user.create({
      data: { ...data, role: 'CUSTOMER' },
    });

    return { message: 'Register success', user };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return { message: 'Email not found' };
    }

    if (user.password !== data.password) {
      return { message: 'Invalid password' };
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { message: 'Login success', token };
  }
}