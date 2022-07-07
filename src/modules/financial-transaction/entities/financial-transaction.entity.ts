import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';

import { ApiProperty } from '@nestjs/swagger';
import { FINANCIAL_TRANSACTION_TYPE } from '../constants/financial-transaction-type';

@Entity('financial_transaction')
export class FinancialTransactionEntity {
    @ApiProperty({ format: 'uuid', example: '67c02775-5aeb-4e55-9439-b1893a427192' })
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Uber' })
    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @ApiProperty({ example: 'Deslocamento de casa até o trabalho' })
    @IsString()
    @IsNotEmpty()
    @Column()
    description: string;

    @ApiProperty({
        description:
            'Use negative numbers to expenses and positive number to incomes. Max decimal places: 2',
        example: -10.55,
    })
    @IsNumber()
    @Column()
    amount: number;

    @ApiProperty({
        enum: FINANCIAL_TRANSACTION_TYPE,
        example: FINANCIAL_TRANSACTION_TYPE[0],
    })
    @IsEnum(FINANCIAL_TRANSACTION_TYPE)
    @Column()
    type: string;

    @ApiProperty({
        format: 'date',
        example: '2022-06-22',
    })
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    @Column({ type: 'date' })
    date: string;

    @ApiProperty({ format: 'uuid', example: '67c02775-5aeb-4e55-9439-b1893a427192' })
    @IsUUID('4')
    @IsNotEmpty()
    @Column('uuid')
    category_id: string;

    @ApiProperty()
    @IsDate()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;
}
