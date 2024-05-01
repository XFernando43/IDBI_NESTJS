import * as admin from 'firebase-admin'
import { Injectable } from "@nestjs/common";

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    const serviceAccount = require('../../../../../serviceAccountKey.json')

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'idbi-d3fa7.appspot.com'
    });

    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
}