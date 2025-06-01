import { Module } from '@nestjs/common';
import { DataTransferService } from './data-transfer.service';
import { DataTransferController } from './data-transfer.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CleanupService } from 'src/services/cleanup/cleanup.service';


@Module({
  imports: [FirebaseModule],
  controllers: [DataTransferController],
  providers: [DataTransferService, CleanupService],
})
export class DataTransferModule {}
