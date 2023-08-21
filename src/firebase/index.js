import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import admin from 'firebase-admin'

dotenv.config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)


const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.GOOGLE_STORE_BUCKET
});

export const authFirebaseApp = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);

export const bucket = admin.storage().bucket();
