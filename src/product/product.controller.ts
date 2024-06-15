import { Controller,Body,Post,Patch,Get,Delete,Param, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags, SwaggerModule } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from 'entities/product.entity';
import { ProductService } from './product.service';
import { query } from 'express';
import { ProductUpdateDto } from './dto/productUpdate.dto';
import { AuthGuard } from './gaurds/products.guards';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './gaurds/products.guards copy';
import { LoginDto } from 'src/auth/dto/login-request.dto';


@Controller('product')
export class ProductController {
    
    constructor(private ProductService : ProductService){}

    @ApiCreatedResponse()
    @ApiTags('Creation of Products')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['Admin'])
    @Post('product')
    createProduct(@Body() body :ProductDto) : Promise<any>{
       return this.ProductService.createProduct(body);
    }

    @ApiTags('updation of products')
    @ApiCreatedResponse()
    @ApiQuery({name : "product_id",required:false})
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['Admin'])
    @Patch('update')
    updateProduct(@Query ('product_id') product_id : number,@Body()data:ProductUpdateDto) : Promise<any>{ 
      return this.ProductService.updateProduct(product_id,data);
    }

    @ApiTags('display of products')
    @ApiCreatedResponse()
    @ApiQuery({name : "product_name",required:false})

    @Get('get')
    readProduct(@Query('product_name') p_name:string ) : Promise<ProductEntity>{
        return this.ProductService.readProduct(p_name);
    }

    @ApiTags('deletion of products')
    @ApiCreatedResponse()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['Admin'])
    @Delete('delete')
    deleteProduct(@Query('product_id') p_id: number) : Promise<any>{
        return this.ProductService.deleteProduct(p_id);
    }
}
