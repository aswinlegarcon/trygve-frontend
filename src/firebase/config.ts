import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Sends an OTP to the provided phone number using Firebase.
 * @param phone - The full phone number including country code.
 * @returns A promise that resolves with the confirmation result.
 */
export const sendOtp = (phone: string): Promise<ConfirmationResult> => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
            // reCAPTCHA solved, you can proceed with sign-in
        }
    });
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
};

export { auth };