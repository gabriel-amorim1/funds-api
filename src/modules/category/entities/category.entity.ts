import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { FinancialTransactionEntity } from '../../financial-transaction/entities/financial-transaction.entity';

@Entity('categories')
export class CategoryEntity {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    description: string;

    @IsDate()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @IsDate()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(
        () => FinancialTransactionEntity,
        financialTransaction => financialTransaction.category,
    )
    financial_transactions: FinancialTransactionEntity[];
}
