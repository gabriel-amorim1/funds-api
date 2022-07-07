import { Test, TestingModule } from '@nestjs/testing';

import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { FINANCIAL_TRANSACTION_TYPE } from '../constants/financial-transaction-type';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
import { FinancialTransactionService } from './financial-transaction.service';
import { FindAllFinancialTransactionsDto } from '../dto/find-all-financial-transactions.dto';
import { FindAllResponse } from '../../../common/interfaces';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FinancialTransactionService', () => {
    let service: FinancialTransactionService;
    let repository: Repository<FinancialTransactionEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FinancialTransactionService,
                {
                    provide: getRepositoryToken(FinancialTransactionEntity),
                    useValue: {
                        save: jest.fn(),
                        findAndCount: jest.fn(),
                        findOne: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        })
            .useMocker(() => ({}))
            .compile();

        service = module.get<FinancialTransactionService>(FinancialTransactionService);
        repository = await module.resolve(getRepositoryToken(FinancialTransactionEntity));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    const financialTransaction: FinancialTransactionEntity = {
        name: 'name',
        description: 'description',
        type: FINANCIAL_TRANSACTION_TYPE[0],
        date: '2022-07-06',
        amount: 1005,
        id: '9fe3cd15-158b-4ae6-a098-0a4745d53c56',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('#create', () => {
        it('should create a financial transaction', async () => {
            const createFinancialTransactionSut: CreateFinancialTransactionDto = {
                name: financialTransaction.name,
                description: financialTransaction.description,
                amount: 10.05,
                type: financialTransaction.type,
                date: financialTransaction.date,
            };

            const repositorySpy = jest
                .spyOn(repository, 'save')
                .mockResolvedValue(financialTransaction);

            const res = await service.create(createFinancialTransactionSut);

            expect(res).toEqual(financialTransaction);
            expect(repositorySpy).toBeCalledWith({
                ...createFinancialTransactionSut,
                amount: 1005,
            });
        });
    });

    describe('#findAll', () => {
        it('should return a list of financial transactions when given filters', async () => {
            const count = 1;
            const repositorySpy = jest
                .spyOn(repository, 'findAndCount')
                .mockResolvedValue([[financialTransaction], count]);

            const queryParams: FindAllFinancialTransactionsDto = {
                amount: financialTransaction.amount, // todo transformToCents
                dateFilter: 'date',
                sortParam: 'date',
                name: financialTransaction.name,
                description: financialTransaction.description,
                type: financialTransaction.type,
                page: '1',
                size: '20',
                sortOrder: 'DESC',
                startDateFilter: '2022-07-01',
                endDateFilter: '2022-07-31',
            };

            const res = await service.findAll(queryParams);

            const expectedRes: FindAllResponse<FinancialTransactionEntity> = {
                data: [financialTransaction],
                count,
                limit: parseInt(queryParams.size),
                page: parseInt(queryParams.page),
                totalPages: 1,
            };

            expect(res).toEqual(expectedRes);
            expect(repositorySpy).toBeCalledTimes(1);
        });

        it('should return a list of financial transactions when not given filters', async () => {
            const count = 1;
            const repositorySpy = jest
                .spyOn(repository, 'findAndCount')
                .mockResolvedValue([[financialTransaction], count]);

            const queryParams: FindAllFinancialTransactionsDto = {};

            const res = await service.findAll(queryParams);

            const expectedRes: FindAllResponse<FinancialTransactionEntity> = {
                data: [financialTransaction],
                count,
                limit: 20,
                page: 1,
                totalPages: 1,
            };

            expect(res).toEqual(expectedRes);
            expect(repositorySpy).toBeCalledWith({
                order: {
                    createdAt: 'DESC',
                },
                orderBy: {
                    columnName: 'createdAt',
                    order: 'DESC',
                },
                skip: 0,
                take: 20,
                where: {},
            });
        });
    });

    describe('#findOne', () => {
        it('should return a financial transaction by id', async () => {
            const repositorySpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(financialTransaction);

            const res = await service.findOne(financialTransaction.id);

            expect(res).toEqual(financialTransaction);
            expect(repositorySpy).toBeCalledWith({ where: { id: financialTransaction.id } });
        });

        it('should throw NotFoundException', async () => {
            expect.hasAssertions();

            const repositorySpy = jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            try {
                await service.findOne(financialTransaction.id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toBe('Financial Transaction not found.');
                expect(repositorySpy).toBeCalledWith({ where: { id: financialTransaction.id } });
            }
        });
    });

    describe('#update', () => {
        it('should return a financial transaction by id when given amount', async () => {
            const findOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(financialTransaction);

            const updateFinancialTransactionDto: UpdateFinancialTransactionDto = {
                name: 'update name',
                description: 'update description',
                amount: 2.56,
                type: 'update type',
                date: '2022-07-05',
            };
            const expectedResponse = {
                ...financialTransaction,
                ...updateFinancialTransactionDto,
                amount: 256,
            };
            const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(expectedResponse);

            const res = await service.update(
                financialTransaction.id,
                updateFinancialTransactionDto,
            );

            expect(res).toEqual(expectedResponse);
            expect(findOneSpy).toBeCalledWith({ where: { id: financialTransaction.id } });
            expect(saveSpy).toBeCalledWith(expectedResponse);
        });

        it('should return a financial transaction by id when is not given amount', async () => {
            const findOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(financialTransaction);

            const updateFinancialTransactionDto: UpdateFinancialTransactionDto = {
                name: 'update name',
                description: 'update description',
                type: 'update type',
                date: '2022-07-05',
            };
            const expectedResponse = {
                ...financialTransaction,
                ...updateFinancialTransactionDto,
            };
            const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(expectedResponse);

            const res = await service.update(
                financialTransaction.id,
                updateFinancialTransactionDto,
            );

            expect(res).toEqual(expectedResponse);
            expect(findOneSpy).toBeCalledWith({ where: { id: financialTransaction.id } });
            expect(saveSpy).toBeCalledWith(expectedResponse);
        });
    });

    describe('#remove', () => {
        it('should remove a financial transaction by id', async () => {
            const findOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(financialTransaction);

            const removeSpy = jest
                .spyOn(repository, 'remove')
                .mockResolvedValue(financialTransaction);

            await service.remove(financialTransaction.id);

            expect(findOneSpy).toBeCalledWith({ where: { id: financialTransaction.id } });
            expect(removeSpy).toBeCalledWith(financialTransaction);
        });
    });
});
