import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

const userSelect = {
  id: true,
  email: true,
  phone: true,
  firstName: true,
  lastName: true,
  status: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
  roles: {
    select: {
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} satisfies Prisma.UserSelect;

type SelectedUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    search?: string,
    status?: UserStatus,
  ): Promise<UserResponseDto[]> {
    const normalizedSearch = search?.trim();

    const users = await this.prisma.user.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(normalizedSearch
          ? {
              OR: [
                { email: { contains: normalizedSearch, mode: 'insensitive' } },
                {
                  firstName: {
                    contains: normalizedSearch,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: normalizedSearch,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
      select: userSelect,
    });

    return users.map((user) => this.toResponse(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponse(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const data: Prisma.UserUpdateInput = {
      ...(dto.email !== undefined
        ? { email: dto.email.trim().toLowerCase() }
        : {}),
      ...(dto.firstName !== undefined
        ? { firstName: dto.firstName.trim() }
        : {}),
      ...(dto.lastName !== undefined ? { lastName: dto.lastName.trim() } : {}),
      ...(dto.phone !== undefined ? { phone: dto.phone?.trim() || null } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
    };

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
        select: userSelect,
      });

      return this.toResponse(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException(
            'A user with this email or phone already exists',
          );
        }
      }

      throw error;
    }
  }

  private toResponse(user: SelectedUser): UserResponseDto {
    return {
      ...user,
      roles: user.roles.map(({ role }) => role),
    };
  }
}
