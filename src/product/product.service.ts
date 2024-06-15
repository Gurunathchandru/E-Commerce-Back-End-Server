import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DBService } from 'external-services/DBService';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from 'entities/product.entity';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
    pool: Pool;
   //  productDto = new ProductDto(); 

    constructor(private readonly dbservice:DBService){
        this.pool = dbservice.pool;
    }

    async createProduct(productDto :ProductDto):Promise<any> 
    { 
     const {sku } = productDto;
     const existingproperties = await this.getProductByProperties(sku);
     if(existingproperties){ 
        throw new Error("product already exists");
     }

        let query1 = 'INSERT INTO products (data) VALUES($1)';
        const param = [productDto];
        try{
           const result = await this.pool.query(query1,param);
           return result.rows[0];
        }catch(error){
           console.log("error executing query");
           throw error;
        }
    }
    async getProductByProperties(sku :string):Promise<any>
    {
     let query = 'SELECT * FROM products WHERE data->>\'sku\' = ($1) ';
     const  param = [sku];
     try{
     const result = await this.pool.query(query,param);
     return result.rows[0]
     console.log(result);
     }catch(error)
     {
      throw error;
     }
    }

    async updateProduct( product_id: number,data:ProductUpdateDto):Promise<any>{
      
      const query1 = 'SELECT * FROM products WHERE p_id = ($1) ';
      const param1 = [product_id];
      const result = await this.pool.query(query1, param1);

      if (result.rows.length === 0) {
         throw new Error(`Product with ID ${product_id} not found`);
     }
      const existingProduct = result.rows[0];
      console.log(existingProduct);

       let query2 = 'UPDATE products SET data = $1 WHERE p_id=$2 RETURNING * ';

       const param = [data,product_id];
      
       try{
           const result = await this.pool.query(query2,param);
           console.log(result);
           
           return result.rows[0];
           }catch(error){
           console.log("error executing query");
           throw error;
           }
   }

   //  const { p_id, ...rest } = productDto;
      //  console.log(p_id);
      //  console.log(rest)

   async readProduct(name?:string):Promise<ProductEntity>
   {

      let query1 = " SELECT * FROM products WHERE ";
      let param =[];
      if(name !== undefined)
      {
       query1 += " data->>'p_name' LIKE '%' || $1 || '%' ";
       param.push(name);
      }
           try{
               let result = await this.pool.query(query1,param);
               return result.rows;
               console.log(result);
            }catch(error){
               console.log("error executing query");
               throw error;
            }
   }

   async deleteProduct(p_id:number):Promise<any>{

       let query1 = " DELETE FROM products WHERE p_id = $1 ";
       const param = [p_id];

           try{
               const result = await this.pool.query(query1,param);
               return result.rows[0];
            }catch(error){
               console.log("error executing query");
               throw error;
            }
   }
}
