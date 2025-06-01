import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class DataTransferService {
  private readonly db: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.db = this.firebaseAdmin.firestore();
  }

  async saveData(data: any) {
    // console.log(`the docID passed is:/${data}/`);
    try {
      let docID = this.generateRandomDocID();
      await this.db.collection('data-transfer').doc(docID).set({
        data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      //to confirm whether the data has been saved or not...
      const docSnapshot = await this.db
        .collection('data-transfer')
        .doc(docID)
        .get();
      if (!docSnapshot.exists)
        throw new Error(`Failed to save the data,pls try again later!!!`);
     // console.log('data saved successfully', docSnapshot.data());
      return {
        message: 'data saved successfully',
        result: { ...docSnapshot.data(), docID },
      };
    } catch (error) {
      throw new Error(`Error encountered: ${error.message}`);
    }
  }
  generateRandomDocID() {
    const num = Math.floor(Math.random() * 100000);
    return num.toString().padStart(5, '0');
  }

  async getData(docID: string) {
    try {
      // console.log(`the docID passed is:/${docID}/`);
      const docRef = this.db.collection('data-transfer').doc(docID);
      const docSnap = await docRef.get();
     // console.log('data fetched from get-api:', docSnap.data());
      if (!docSnap.exists) {
        return {
          message: 'no data found matching the given docID',
          result: {},
        };
      }
      return {
        message: 'data found successfully',
        result: { ...docSnap.data(), docID },
      };
    } catch (e) {
      throw e;
    }
  }
}
