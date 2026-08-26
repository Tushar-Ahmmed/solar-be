import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { ListUsersDto } from './dto/list-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN', 'STAFF')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({
    description: 'Admin, staff, or super admin role required',
  })
  @ApiOperation({ summary: 'List users' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by name or email',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    minimum: 1,
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @ApiQuery({
    name: 'role',
    required: false,
    type: String,
    description: 'Filter by role name, for example ADMIN or CUSTOMER',
  })
  @ApiQuery({ name: 'status', required: false, enum: UserStatus })
  @ApiResponse({ status: 200, type: PaginatedUsersResponseDto })
  findAll(@Query() dto: ListUsersDto): Promise<PaginatedUsersResponseDto> {
    return this.usersService.findAll(dto);
  }

  @Get('me')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiOperation({ summary: 'Get the currently authenticated user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  findMe(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    return this.usersService.findOne(user.id);
  }

  @Patch('me')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiOperation({ summary: 'Update the currently authenticated user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(user.id, dto);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPER_ADMIN', 'STAFF')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({
    description: 'Admin, staff, or super admin role required',
  })
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({ description: 'Admin or super admin role required' })
  @ApiOperation({ summary: 'Activate, deactivate, or suspend a user' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateStatus(id, dto);
  }

  @Patch(':id/role')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({ description: 'Admin or super admin role required' })
  @ApiOperation({ summary: "Change a user's role" })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserRoleDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateRole(id, dto);
  }
}
