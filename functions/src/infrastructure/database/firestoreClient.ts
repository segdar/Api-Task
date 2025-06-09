import admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';




class FirestoreClient {
  private static instance: Firestore;

  private constructor() {} 

  public static getInstance(): Firestore {
    if (!FirestoreClient.instance) {

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(), 
        });
      }

      FirestoreClient.instance = admin.firestore();
    }

    return FirestoreClient.instance;
  }
}

export default FirestoreClient;