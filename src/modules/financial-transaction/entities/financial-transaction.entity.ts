import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';

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

    @IsUUID('4')
    @IsNotEmpty()
    @Column('uuid')
    category_id: string;

    @IsDate()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @IsDate()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;
}
