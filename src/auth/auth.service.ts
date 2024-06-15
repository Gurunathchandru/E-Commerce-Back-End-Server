import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto } from './dto/login-request.dto';
import { DBService } from 'external-services/DBService';
import {Pool} from 'pg';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    pool: Pool
    constructor(
        private readonly dbService: DBService
    ) {
        this.pool = dbService.pool;
    }

    async login(data: LoginDto) {
        let table =data.userType === "Admin" ? "Admin" : "Customers";
        const result = await this.pool
        .query(`SELECT * FROM ${table} WHERE JSONB_EXTRACT_PATH_TEXT(data,'email')= $1`,[data.email],)
        .catch((error) => {
            console.log(error);
            throw new InternalServerErrorException('Error in fetching Customer data',
            );
        })
        // check if user exists
        // let result = await this.pool.query(
        //     'SELECT * FROM customers WHERE JSONB_EXTRACT_PATH_TEXT(data, \'email\') = $1', 
        //     [data.email]
        //     ).catch(error => {
        //         console.log(error);
        //         throw new InternalServerErrorException('Error fetching customer details');
        //     });
            if(result.rows.length === 0) {
                throw new BadRequestException('User not found');
            }
        // check if the password is correct    
        let {c_id: customerId, data: userData} = result.rows[0]; //destructuring
        const passwordMatch = await bcrypt.compare(data.password, userData.password);
        if (!passwordMatch) {
            throw new BadRequestException('Invalid Password')
        }
        const responseUserObject = new LoginResponseDto(
            userData.first_name, 
            userData.last_name,
            userData.email,
            userData.phone
            );
        // if everythin is fine generate token and sent to front end
        return {
            message: 'Successfully logged in',
            access_token: '12345',
            user: responseUserObject 
        }
    }

    
}
