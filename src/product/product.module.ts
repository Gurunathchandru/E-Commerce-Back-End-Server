import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DBService } from 'external-services/DBService';

@Module({ 
    controllers : [ProductController],
    providers :[ProductService,DBService]
})

export class ProductModule{}
