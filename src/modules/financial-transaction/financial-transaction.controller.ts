import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FinancialTransactionService } from './services/financial-transaction.service';
import {
    CreateFinancialTransactionDoc,
    CreateFinancialTransactionDto,
} from './dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial-transaction.dto';
import { FinancialTransactionEntity } from './entities/financial-transaction.entity';
import { FindAllResponse } from '../../common/interfaces';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { FindAllFinancialTransactionsDto } from './dto/find-all-financial-transactions.dto';

@Controller('financial-transaction')
export class FinancialTransactionController {
    constructor(private readonly financialTransactionService: FinancialTransactionService) {}

    @ApiBody({ type: CreateFinancialTransactionDoc })
    @ApiResponse({ type: FinancialTransactionEntity })
    @Post()
    create(
        @Body() createFinancialTransactionDto: CreateFinancialTransactionDto,
    ): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.create(createFinancialTransactionDto);
    }

    @Get()
    findAll(
        @Query() queryParams: FindAllFinancialTransactionsDto,
    ): Promise<FindAllResponse<FinancialTransactionEntity>> {
        return this.financialTransactionService.findAll(queryParams);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto,
    ): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.update(id, updateFinancialTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.financialTransactionService.remove(id);
    }
}
