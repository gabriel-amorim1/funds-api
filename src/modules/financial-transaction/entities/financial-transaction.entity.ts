import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from 'class-validator';

@Entity('financial_transaction')
export class FinancialTransactionEntity {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    description: string;

    @IsNumber()
    @Column()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    type: string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    @Column({ type: 'date' })
    date: string;

    @IsDate()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @IsDate()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
