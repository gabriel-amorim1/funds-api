import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionEntity } from './entities/financial-transaction.entity';
import { FinancialTransactionService } from './services/financial-transaction.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([FinancialTransactionEntity])],
    controllers: [FinancialTransactionController],
    providers: [FinancialTransactionService],
})
export class FinancialTransactionModule {}
