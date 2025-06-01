import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Aditya!, this is the api endpoint for NEST based backend!!!';
  }  
}
