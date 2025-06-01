import { Test, TestingModule } from '@nestjs/testing';
import { DataTransferController } from './data-transfer.controller';
import { DataTransferService } from './data-transfer.service';

describe('DataTransferController', () => {
  let controller: DataTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataTransferController],
      providers: [DataTransferService],
    }).compile();

    controller = module.get<DataTransferController>(DataTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
