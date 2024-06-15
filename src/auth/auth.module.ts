import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DBService } from 'external-services/DBService';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DBService]
})
export class AuthModule {}
