import { FinancialTransactionEntity } from '../modules/financial-transaction/entities/financial-transaction.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [FinancialTransactionEntity],
    synchronize: true,
};
