import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { FindAllQueryDto } from '../../../common/dtos/find-all-query.dto';
import { dateFields } from '../../../common/constants';

const sortParams = ['description', 'amount', ...dateFields];

export class FindAllFinancialTransactionsDto extends IntersectionType(
    PartialType(FinancialTransactionEntity),
    FindAllQueryDto,
) {
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    amount?: number;

    @ApiPropertyOptional({
        type: 'string',
        enum: dateFields,
        example: 'created_at',
    })
    @IsOptional()
    @IsEnum(dateFields, {
        message: `dateFilter must be one of: ${dateFields.join(', ')}`,
    })
    readonly dateFilter?: string;

    @ApiPropertyOptional({
        type: 'string',
        enum: sortParams,
        example: 'created_at',
    })
    @IsOptional()
    @IsEnum(sortParams, {
        message: `sortParam must be one of: ${sortParams.join(', ')}`,
    })
    readonly sortParam?: string;
}
