import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  statusChecker() {
    return {
      status: 'your nest-based backend is working!!!!',
    };
  }
}
