import { BadRequestException,Injectable } from '@nestjs/common';
import {Pool} from 'pg';
import { DBService } from 'external-services/DBService';
import { BadGatewayException } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CustomerService {

    pool: Pool;

    constructor(private readonly dbservice:DBService){
        this.pool = dbservice.pool;
    }

    async signUp(customerDto:CustomerDto): Promise<any> {
        //{"email": "guru@1234", "phone": "6366218820", "address": "bengaluru", "last_name": "c", "first_name": "gurunath"}
        const { password,
            ...rest} = customerDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const HashedPassword = {
            ...rest,
            password: hashedPassword,
        };
            
        let query1 = 'INSERT INTO customers (data) VALUES($1)';
        //let query2 = 'SELECT * FROM customers WHERE data->'email' = username'
        const params = [HashedPassword]
        try{
        const result = await this.pool.query(query1,params);
        return result.rows[0];
        
        }catch(error){
        console.log("Error executing query",error);
        throw error;
       }  
    } 

}
