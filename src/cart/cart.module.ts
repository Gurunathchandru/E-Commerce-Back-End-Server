import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { DBService } from 'external-services/DBService';
import { CartController } from './cart.controller';


@Module({
    providers: [CartService,DBService], 
    controllers : [CartController]
  })
  export class CartModule {}