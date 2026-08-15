import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8Fih0unzB2CCCCCDNKycgqJ4ZJGQVV4o",
  authDomain: "mini-student-record.firebaseapp.com",
  projectId: "mini-student-record",
  storageBucket: "mini-student-record.firebasestorage.app",
  messagingSenderId: "809596531560",
  appId: "1:809596531560:web:f4b8a1840cfcce51d11cdd",
  measurementId: "G-GFFX7PKDTP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
