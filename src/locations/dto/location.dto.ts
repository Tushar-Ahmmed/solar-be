import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateDivisionDto {
  @ApiProperty() @IsString() name!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nameBn?: string;
  @ApiProperty() @IsString() slug!: string;
  @ApiProperty() @IsString() code!: string;
}

export class UpdateDivisionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nameBn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() slug?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() code?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateDistrictDto extends CreateDivisionDto {
  @ApiProperty() @IsUUID() divisionId!: string;
}

export class UpdateDistrictDto extends UpdateDivisionDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() divisionId?: string;
}

export class CreateUpazilaDto extends CreateDivisionDto {
  @ApiProperty() @IsUUID() districtId!: string;
}

export class UpdateUpazilaDto extends UpdateDivisionDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() districtId?: string;
}

export class UpdateLocationStatusDto {
  @ApiProperty() @IsBoolean() isActive!: boolean;
}

export class ListLocationsDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;
  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsUUID() divisionId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() districtId?: string;
  @ApiPropertyOptional({ enum: ['name', 'code', 'createdAt'] })
  @IsOptional()
  @IsString()
  sortBy = 'name';
  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder: 'asc' | 'desc' = 'asc';
}
