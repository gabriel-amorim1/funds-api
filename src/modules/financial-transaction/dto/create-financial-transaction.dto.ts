import { Column } from 'typeorm';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateFinancialTransactionDto extends OmitType(FinancialTransactionEntity, [
    'id',
    'createdAt',
    'updatedAt',
]) {
    @IsNumber({ maxDecimalPlaces: 2 })
    @Column()
    amount: number;
}
