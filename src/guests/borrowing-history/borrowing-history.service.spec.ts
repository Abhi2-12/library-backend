import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingHistoryService } from './borrowing-history.service';

describe('BorrowingHistoryService', () => {
  let service: BorrowingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowingHistoryService],
    }).compile();

    service = module.get<BorrowingHistoryService>(BorrowingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
