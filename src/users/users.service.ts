import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListUsersDto } from './dto/list-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
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

  async findAll(dto: ListUsersDto): Promise<PaginatedUsersResponseDto> {
    const normalizedSearch = dto.search?.trim();
    const normalizedRole = dto.role?.trim().toUpperCase();
    const where: Prisma.UserWhereInput = {
      ...(dto.status ? { status: dto.status } : {}),
      ...(normalizedRole
        ? {
            roles: {
              some: {
                role: { name: normalizedRole },
              },
            },
          }
        : {}),
      ...(normalizedSearch
        ? {
            OR: [
              { email: { contains: normalizedSearch, mode: 'insensitive' } },
              {
                firstName: { contains: normalizedSearch, mode: 'insensitive' },
              },
              { lastName: { contains: normalizedSearch, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const skip = (dto.page - 1) * dto.limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: dto.limit,
        orderBy: { createdAt: 'desc' },
        select: userSelect,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: users.map((user) => this.toResponse(user)),
      page: dto.page,
      limit: dto.limit,
      total,
      totalPages: Math.ceil(total / dto.limit),
    };
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

  async updateStatus(
    id: string,
    dto: UpdateUserStatusDto,
  ): Promise<UserResponseDto> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { status: dto.status },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }

    return this.findOne(id);
  }

  async updateRole(
    id: string,
    dto: UpdateUserRoleDto,
  ): Promise<UserResponseDto> {
    const role = await this.prisma.role.findUnique({
      where: { name: dto.role.trim().toUpperCase() },
    });
    if (!role) throw new NotFoundException('Role not found');

    try {
      await this.prisma.$transaction([
        this.prisma.userRole.deleteMany({ where: { userId: id } }),
        this.prisma.userRole.create({ data: { userId: id, roleId: role.id } }),
      ]);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }

    return this.findOne(id);
  }

  private toResponse(user: SelectedUser): UserResponseDto {
    return {
      ...user,
      roles: user.roles.map(({ role }) => role),
    };
  }
}
