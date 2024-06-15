import { Pool } from 'pg';

export class DBService{
    pool:Pool;

    constructor(){
        this.initialisePoolClient();
    }

    initialisePoolClient(){
        this.pool = new Pool({
            database: 'ecommerce',
            user: 'gurunathc',
            password: 'guru@123',
            host: '127.0.0.1',
            port: 5432

        })
    }
}