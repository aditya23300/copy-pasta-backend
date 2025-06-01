import { ConfigService } from '@nestjs/config';

export const firebaseProvider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    var admin = require('firebase-admin');
    var serviceAccount = require('path/to/serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return admin;
  },
};
