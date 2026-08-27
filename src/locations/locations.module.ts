import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {
  AdminLocationsController,
  LocationsController,
} from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [AuthModule],
  controllers: [LocationsController, AdminLocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
