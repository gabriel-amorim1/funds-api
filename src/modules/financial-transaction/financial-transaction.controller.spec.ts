import { Test, TestingModule } from '@nestjs/testing';

import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionService } from './services/financial-transaction.service';

describe('FinancialTransactionController', () => {
    let controller: FinancialTransactionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FinancialTransactionController],
            providers: [FinancialTransactionService],
        })
            .useMocker(() => ({}))
            .compile();

        controller = module.get<FinancialTransactionController>(FinancialTransactionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
