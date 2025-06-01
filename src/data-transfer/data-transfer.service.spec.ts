import { Test, TestingModule } from '@nestjs/testing';
import { DataTransferService } from './data-transfer.service';

describe('DataTransferService', () => {
  let service: DataTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataTransferService],
    }).compile();

    service = module.get<DataTransferService>(DataTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
