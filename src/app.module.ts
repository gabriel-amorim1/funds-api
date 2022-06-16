import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { FinancialTransactionModule } from './modules/financial-transaction/financial-transaction.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { databaseConfig } from './database';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forRoot(databaseConfig),
        FinancialTransactionModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
