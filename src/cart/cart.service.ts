import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DBService } from 'external-services/DBService';
import axios from'axios';
import { CartDto } from './dto/cart.dto';
import { AddtoCart } from 'entities/AddtoCart.entity';
import  * as Redis from 'redis'


const redisClient = Redis.createClient({
   // @ts-ignore
    host :'localhost',
    post :6379,
});

redisClient.on('error',(error) => {
    console.log("error occured on connecting redis client",error);
});

@Injectable()
export class CartService {
    pool: Pool;
    constructor(private readonly dbService: DBService) {
      this.pool = dbService.pool;
}
// private readonly apiUrl = 'https://jsonblob.com/api/jsonBlob';

async addItemsToCart(c_name :string,pname: string, quantity: number): Promise<AddtoCart[]> {
    try {
        const { rows } = await this.pool.query(
            'SELECT data->>\'p_price\' AS p_price FROM products WHERE data->>\'p_name\' = $1',
            [pname]
          );
          // Extract the pprice from the JSONB data
          const price = rows.length > 0 ? parseFloat(rows[0].p_price) : null;
          console.log(price);
        const data = {
            pname: pname,
            pprice: price,
            quantity: quantity,
            totalbill: price*quantity
        };
        var response = await axios.post('https://jsonblob.com/api/jsonBlob', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        var apiId = response.headers.location.split('/').pop();
        var ID=[]
        ID.push(apiId)
        console.log(response.data);
        

        // client.hset('customer_cart_mapping', customerId, apiId);
        const c_id= await this.pool.query(" SELECT c_id FROM customers WHERE data->>'first_name'= ($1)",[c_name] );
        redisClient.hSet(c_id,apiId);

    
        // redisClient.get(c_id)

    //    const res = redisClient.get(c_id);
    //    console.log(res)

       return apiId;
    } catch (error) {
        console.error('Error adding to cart:', error);

    }

}

async getJson(blobId: string): Promise<any> {
    const response = await axios.get(`https://jsonblob.com/api/jsonBlob/${blobId}`);
    return response.data;
}

async put(){
    let result = await axios.put('https://jsonblob.com/api/jsonBlob/:cartId',{
        headers:{
            'Content-Type': 'application/json',
          'Authorization':  'token'
        }})
}

async delete(){
    let result = await axios.delete('https://jsonblob.com/api/jsonBlob/:cartId',{
        headers:{
            'Content-Type': 'application/json',
          'Authorization':  'token'
        }})
}
}

