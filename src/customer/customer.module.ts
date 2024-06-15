import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { DBService } from 'external-services/DBService';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService,DBService]
})
export class CustomerModule {}
