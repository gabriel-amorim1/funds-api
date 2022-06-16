import { Test, TestingModule } from '@nestjs/testing';

import { FinancialTransactionService } from './financial-transaction.service';

describe('FinancialTransactionService', () => {
    let service: FinancialTransactionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FinancialTransactionService],
        }).compile();

        service = module.get<FinancialTransactionService>(FinancialTransactionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
