import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { query } from 'express';
import { CartDto } from './dto/cart.dto';



@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("addcart")
  async getCartData(@Query('c_name')c_name :string,@Query('p_name') p_name:string,@Query('quantity') quantity:number){
    return await this.cartService.addItemsToCart(c_name,p_name,quantity);
  }

  @Get('getcart')
  async createCartItem(@Param('blobId')blobId:string) {
    return await this.cartService.getJson('blobId');
  }

  @Put(':cartId')
  async updateCartItem() {
    return await this.cartService.put();
  }

  @Delete(':cartId')
  async deleteCartItem() {
    return await this.cartService.delete();
  }
}




