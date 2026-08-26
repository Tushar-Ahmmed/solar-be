import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({ example: 'STAFF' })
  @IsString()
  @MinLength(2)
  role: string;
}
