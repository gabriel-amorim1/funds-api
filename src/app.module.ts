import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { databaseConfig } from './database';
import { CategoryModule } from './modules/category/category.module';
import { FinancialTransactionModule } from './modules/financial-transaction/financial-transaction.module';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forRoot(databaseConfig),
        FinancialTransactionModule,
        CategoryModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
