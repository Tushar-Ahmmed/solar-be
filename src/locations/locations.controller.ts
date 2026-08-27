import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  CreateDistrictDto,
  CreateDivisionDto,
  CreateUpazilaDto,
  ListLocationsDto,
  UpdateDistrictDto,
  UpdateDivisionDto,
  UpdateLocationStatusDto,
  UpdateUpazilaDto,
} from './dto/location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {}
  @Get('divisions')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'List active Bangladesh divisions (public)' })
  divisions() {
    return this.service.findActiveDivisions();
  }
  @Get('divisions/:id')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'Get a division by ID (public)' })
  division(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findDivision(id);
  }
  @Get('divisions/:divisionId/districts')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'List active districts in a division (public)' })
  districts(@Param('divisionId', ParseUUIDPipe) id: string) {
    return this.service.findActiveDistricts(id);
  }
  @Get('districts/:id')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'Get a district by ID (public)' })
  district(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findDistrict(id);
  }
  @Get('districts/:districtId/upazilas')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'List active upazilas in a district (public)' })
  upazilas(@Param('districtId', ParseUUIDPipe) id: string) {
    return this.service.findActiveUpazilas(id);
  }
  @Get('upazilas/:id')
  @ApiTags('Locations - Public')
  @ApiOperation({ summary: 'Get an upazila by ID (public)' })
  upazila(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findUpazila(id);
  }

  @Post('divisions')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a division' })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({ description: 'Admin permission required' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:create')
  createDivision(@Body() dto: CreateDivisionDto) {
    return this.service.createDivision(dto);
  }
  @Patch('divisions/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a division' })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({ description: 'Admin permission required' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:update')
  updateDivision(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDivisionDto,
  ) {
    return this.service.updateDivision(id, dto);
  }
  @Delete('divisions/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deactivate a division' })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @ApiForbiddenResponse({ description: 'SUPER_ADMIN permission required' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:delete')
  deleteDivision(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deactivateDivision(id);
  }
  @Post('districts')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a district' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:create')
  createDistrict(@Body() dto: CreateDistrictDto) {
    return this.service.createDistrict(dto);
  }
  @Patch('districts/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a district' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:update')
  updateDistrict(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDistrictDto,
  ) {
    return this.service.updateDistrict(id, dto);
  }
  @Delete('districts/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deactivate a district' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:delete')
  deleteDistrict(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deactivateDistrict(id);
  }
  @Post('upazilas')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an upazila' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:create')
  createUpazila(@Body() dto: CreateUpazilaDto) {
    return this.service.createUpazila(dto);
  }
  @Patch('upazilas/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an upazila' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @RequirePermissions('location:update')
  updateUpazila(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUpazilaDto,
  ) {
    return this.service.updateUpazila(id, dto);
  }
  @Delete('upazilas/:id')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deactivate an upazila' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:delete')
  deleteUpazila(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deactivateUpazila(id);
  }
  @Patch('divisions/:id/status')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Activate or deactivate a division' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:update')
  statusDivision(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLocationStatusDto,
  ) {
    return this.service.activateDivision(id, dto);
  }
  @Patch('districts/:id/status')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Activate or deactivate a district' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:update')
  statusDistrict(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLocationStatusDto,
  ) {
    return this.service.activateDistrict(id, dto);
  }
  @Patch('upazilas/:id/status')
  @ApiTags('Locations - Admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Activate or deactivate an upazila' })
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('SUPER_ADMIN')
  @RequirePermissions('location:update')
  statusUpazila(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLocationStatusDto,
  ) {
    return this.service.activateUpazila(id, dto);
  }
}

@ApiTags('Locations - Admin')
@ApiBearerAuth('access-token')
@Controller('admin/locations')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Roles('SUPER_ADMIN', 'ADMIN', 'STAFF')
export class AdminLocationsController {
  constructor(private readonly service: LocationsService) {}
  @Get('divisions')
  @ApiOperation({
    summary: 'Admin list divisions with search, status, and pagination',
  })
  @RequirePermissions('location:read')
  divisions(@Query() dto: ListLocationsDto) {
    return this.service.list('division', dto);
  }
  @Get('districts')
  @ApiOperation({
    summary: 'Admin list districts with division filtering and pagination',
  })
  @RequirePermissions('location:read')
  districts(@Query() dto: ListLocationsDto) {
    return this.service.list('district', dto);
  }
  @Get('upazilas')
  @ApiOperation({
    summary: 'Admin list upazilas with district filtering and pagination',
  })
  @RequirePermissions('location:read')
  upazilas(@Query() dto: ListLocationsDto) {
    return this.service.list('upazila', dto);
  }
}
