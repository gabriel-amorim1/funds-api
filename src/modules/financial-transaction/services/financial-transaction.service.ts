import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinancialTransactionService {
    constructor(
        @InjectRepository(FinancialTransactionEntity)
        private repository: Repository<FinancialTransactionEntity>,
    ) {}

    async create(
        createFinancialTransactionDto: CreateFinancialTransactionDto,
    ): Promise<FinancialTransactionEntity> {
        return this.repository.save(createFinancialTransactionDto);
    }

    async findAll(): Promise<FinancialTransactionEntity[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<FinancialTransactionEntity> {
        const financialTransactionFound = this.repository.findOne({ where: { id } });

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

        return this.repository.save({
            ...financialTransactionFound,
            updateFinancialTransactionDto,
        });
    }

    async remove(id: string): Promise<void> {
        const financialTransactionFound = await this.findOne(id);

        await this.repository.remove(financialTransactionFound);
    }
}
