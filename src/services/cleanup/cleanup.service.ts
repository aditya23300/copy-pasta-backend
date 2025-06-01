import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import * as admin from 'firebase-admin';
@Injectable()
export class CleanupService implements OnModuleInit {
  private readonly db: admin.firestore.Firestore;
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.db = this.firebaseAdmin.firestore();
  }
  onModuleInit() {
    // runs every day at 2:00 AM
    cron.schedule('0 2 * * *', () => this.runCleanUp);
  }
  async runCleanUp() {
    console.log('[CleanupService] Running cleanup task...');
    try {
      const cutoff = admin.firestore.Timestamp.fromDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
      );

      const querySnapshot = await this.db
        .collection('data-transfer')
        .where('createdAt', '<', cutoff)
        .get();

      if (querySnapshot.empty) {
        console.log('[CleanupService] No outdated documents found.');
        return;
      }

      const batch = this.db.batch();
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log(
        `[CleanupService] Deleted ${querySnapshot.size} documents older than 24 hours.`,
      );
    } catch (error) {
      console.error('[CleanupService] Error during cleanup:', error);
    }
  }
}
