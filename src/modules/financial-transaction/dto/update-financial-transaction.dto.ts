import { CreateFinancialTransactionDto } from './create-financial-transaction.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFinancialTransactionDto extends PartialType(CreateFinancialTransactionDto) {}
