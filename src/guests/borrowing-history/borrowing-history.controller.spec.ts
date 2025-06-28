import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingHistoryController } from './borrowing-history.controller';

describe('BorrowingHistoryController', () => {
  let controller: BorrowingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingHistoryController],
    }).compile();

    controller = module.get<BorrowingHistoryController>(BorrowingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
