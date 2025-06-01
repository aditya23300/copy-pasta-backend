import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DataTransferService } from './data-transfer.service';
import { CreateDataDto } from './dto/create-data.dto';
import { CleanupService } from 'src/services/cleanup/cleanup.service';
import { AuthGuard } from 'src/guards/auth-guard/auth-guard.guard';

@Controller('data-transfer')
export class DataTransferController {
  constructor(
    private readonly dataTransferService: DataTransferService,
    private readonly cleanupService: CleanupService,
  ) {}

  @Post('send-data')
  async saveData(@Body() createDataObj: CreateDataDto) {
    try {
      // console.log('the request received is:', createDataObj);
      const saveInfo = await this.dataTransferService.saveData(
        createDataObj.data.trim(),
      );
      return saveInfo;
    } catch (e) {
      throw e;
    }
  }

  @Get(':docID')
  async getData(@Param('docID') docID: string) {
    try {
      if (typeof docID != 'string' || docID?.trim()?.length == 0)
        throw new BadRequestException('DocID is invalid');
      const data = await this.dataTransferService.getData(docID.trim());
      return data;
    } catch (e) {
      throw e;
    }
  }
  @UseGuards(AuthGuard)
  @Post('run-cleanUp')
  async triggerCleanup() {
    await this.cleanupService.runCleanUp();
    return { message: 'Cleanup task executed manually' };
  }
  @Get('/status')
  findAll() {
    return {
      status: 'data-transfer controller is working',
    };
  }
}
