import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { IsNumber } from 'class-validator';
import { OmitType as OmitSwagger } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';

export class CreateFinancialTransactionDto extends OmitType(FinancialTransactionEntity, [
    'id',
    'createdAt',
    'updatedAt',
]) {
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;
}

export class CreateFinancialTransactionDoc extends OmitSwagger(FinancialTransactionEntity, [
    'id',
    'createdAt',
    'updatedAt',
]) {
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;
}
