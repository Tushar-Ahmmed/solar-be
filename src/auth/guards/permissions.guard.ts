import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required?.length) return true;

    const user = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>().user;
    const permissions = await this.prisma.rolePermission.findMany({
      where: { role: { users: { some: { userId: user.id } } } },
      select: { permission: { select: { name: true } } },
    });
    const granted = new Set(
      permissions.map(({ permission }) => permission.name),
    );
    if (!required.every((permission) => granted.has(permission))) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
