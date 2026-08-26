import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

interface JwtPayload {
  sub: string;
  email: string;
  jti: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'development-secret-key',
      ),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const session = await this.prisma.authSession.findFirst({
      where: {
        id: payload.jti,
        userId: payload.sub,
        revokedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            status: true,
            roles: { select: { role: { select: { name: true } } } },
          },
        },
      },
    });

    if (!session || session.user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }

    return {
      id: session.user.id,
      email: session.user.email,
      roles: session.user.roles.map(({ role }) => role.name),
      sessionId: session.id,
    };
  }
}
