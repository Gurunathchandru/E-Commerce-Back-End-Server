import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { DBService } from 'external-services/DBService';
// import { UsersModule } from './product/product.module';
// import { CustomerModule } from './customer/customer.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { RedisModules } from 'redis';


@Module({
  imports: [AuthModule, HttpModule,CustomerModule,AdminModule,ProductModule,CartModule],
  controllers: [AppController, CartController],
  providers: [AppService, CartService,DBService],
})
export class AppModule {
  // configure (consumer: MiddlewareConsumer): void {
  //   consumer.apply,pro().forRoutes('*')
  }


  