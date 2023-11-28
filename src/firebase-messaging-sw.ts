import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken
} from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const requestFCMAndGetDeviceToken = async (): Promise<string | null> => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);

  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return null;
  }

  console.log('알림 권한이 허용됨');

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_APP_VAPID_KEY
  });

  if (token) console.log('token: ', token);
  else console.log('Can not get Token');

  onMessage(messaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
    // ...
  });

  return token;
};

// FCM APP 제거 및 브라우저 알람 권한 해제

export const deleteFCMToken = async (): Promise<void> => {
  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);
  await deleteToken(messaging);
  console.log('Token deleted.');
};
