import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const serviceAccount: any = {
          type: configService.get<string>('FIREBASE_TYPE'),
          project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
          private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
          private_key: configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'), // critical step
          client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          client_id: configService.get<string>('FIREBASE_CLIENT_ID'),
          auth_uri: configService.get<string>('FIREBASE_AUTH_URI'),
          token_uri: configService.get<string>('FIREBASE_TOKEN_URI'),
          auth_provider_x509_cert_url: configService.get<string>(
            'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
          ),
          client_x509_cert_url: configService.get<string>(
            'FIREBASE_CLIENT_X509_CERT_URL',
          ),
          universe_domain: configService.get<string>(
            'FIREBASE_UNIVERSE_DOMAIN',
          ),
        };

        try {
          if (!admin.apps.length) {
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
            });
          }

          return admin;
        } catch (error) {
          throw new Error(`Failed to initialize Firebase: ${error.message}`);
        }
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
