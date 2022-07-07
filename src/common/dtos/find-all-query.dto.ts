import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllQueryDto {
    @ApiPropertyOptional({
        type: 'number',
        description: 'Records page',
        example: 1,
    })
    @IsOptional()
    @Matches(/\d/)
    readonly page?: string;

    @ApiPropertyOptional({
        type: 'number',
        description: 'Items per page',
        example: 20,
    })
    @IsOptional()
    @Matches(/\d/)
    readonly size?: string;

    @ApiPropertyOptional({
        type: 'string',
        description: 'Sort Order',
        enum: ['desc', 'DESC', 'asc', 'ASC'],
        example: 'desc',
    })
    @IsOptional()
    @IsEnum(['desc', 'DESC', 'asc', 'ASC'], {
        message: `sortOrder must be one of: ${['desc', 'DESC', 'asc', 'ASC']}`,
    })
    readonly sortOrder?: string;

    @ApiPropertyOptional({
        type: 'string',
    })
    @IsOptional()
    @IsString()
    readonly createdAt?: string;

    @ApiPropertyOptional({
        type: 'string',
    })
    @IsOptional()
    @IsString()
    readonly updatedAt?: string;

    @ApiPropertyOptional({
        type: 'string',
    })
    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    readonly startDateFilter?: string;

    @ApiPropertyOptional({
        type: 'string',
    })
    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    readonly endDateFilter?: string;
}
