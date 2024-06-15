import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DBService } from 'external-services/DBService';

@Module({
  providers: [AdminService,DBService],
  controllers : [AdminController]
})
export class AdminModule {}
