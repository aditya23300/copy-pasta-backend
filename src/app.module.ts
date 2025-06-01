import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataTransferModule } from './data-transfer/data-transfer.module';
import { CleanupService } from './services/cleanup/cleanup.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          //set t0 a limit of 10 requests/60 seconds from a single IP address
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    DataTransferModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CleanupService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
