import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import admin from 'firebase-admin'

dotenv.config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const authFirebaseApp = getAuth(firebaseApp);