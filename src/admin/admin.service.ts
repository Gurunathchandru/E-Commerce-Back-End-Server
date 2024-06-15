import { Injectable } from '@nestjs/common';
import {Pool} from 'pg';
import { DBService } from 'external-services/DBService';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
@Injectable()
export class AdminService {
    pool: Pool;
    constructor(private readonly dbService: DBService) {
      this.pool = dbService.pool;
    //   this.test();
    }

    
    async addNewAdmin(adminDto: AdminDto): Promise<any> {
 //   const table = adminDto.logintype;
        const { password,
            ...rest} = adminDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const HashedPassword = {
            ...rest,
            password: hashedPassword,
        };

      const query = `INSERT INTO admin (data) values ($1)`;
      const params = [hashedPassword];
      try {
        const result = await this.pool.query(query, params);
        return result.rows[0];
      } catch (error) {
        console.log('error in adding new Admin', error);
        throw error;
      }
    }
    
}
