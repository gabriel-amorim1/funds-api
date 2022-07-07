import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { Repository } from 'typeorm';
import { FindAllFinancialTransactionsDto } from '../dto/find-all-financial-transactions.dto';
import { formatParamsToTypeOrmOptionsWithPaginate } from '../../../common/format';
import { formatPaginateDataToResponse } from '../../../common/paginate';
import { FindAllResponse } from '../../../common/interfaces';
import { transformToCents } from '../utils/currency';

@Injectable()
export class FinancialTransactionService {
    constructor(
        @InjectRepository(FinancialTransactionEntity)
        private repository: Repository<FinancialTransactionEntity>,
    ) {}

    async create(
        createFinancialTransactionDto: CreateFinancialTransactionDto,
    ): Promise<FinancialTransactionEntity> {
        return this.repository.save({
            ...createFinancialTransactionDto,
            amount: transformToCents(createFinancialTransactionDto.amount),
        });
    }

    async findAll(
        queryParams: FindAllFinancialTransactionsDto,
    ): Promise<FindAllResponse<FinancialTransactionEntity>> {
        const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams);

        const [data, count] = await this.repository.findAndCount(options);

        return formatPaginateDataToResponse(queryParams, {
            data,
            count,
        });
    }

    async findOne(id: string): Promise<FinancialTransactionEntity> {
        const financialTransactionFound = await this.repository.findOne({ where: { id } });

        if (!financialTransactionFound) {
            throw new NotFoundException('Financial Transaction not found.');
        }

        return financialTransactionFound;
    }

    async update(
        id: string,
        updateFinancialTransactionDto: UpdateFinancialTransactionDto,
    ): Promise<FinancialTransactionEntity> {
        const financialTransactionFound = await this.findOne(id);

        const amount = updateFinancialTransactionDto.amount
            ? transformToCents(updateFinancialTransactionDto.amount)
            : financialTransactionFound.amount;

        return this.repository.save({
            ...financialTransactionFound,
            ...updateFinancialTransactionDto,
            amount,
        });
    }

    async remove(id: string): Promise<void> {
        const financialTransactionFound = await this.findOne(id);

        await this.repository.remove(financialTransactionFound);
    }
}
