import axios, { type AxiosResponse } from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL + '/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (runs before every request)
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (runs after every response)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Axios automatically parses JSON
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Better error handling
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('firebase_jwt');
      window.location.href = '/login';
    }
    
    throw new Error(error.response?.data?.message || error.message);
  }
);

// Helper function to get Firebase token
const getFirebaseToken = (): string | null => {
  return localStorage.getItem('firebase_jwt');
};

// 1. Verify Firebase token with backend
export const verifyFirebaseToken = async (): Promise<{ success: boolean; message: string }> => {
  const token = getFirebaseToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return api.post('/auth', { token });
};

// 2. Check if user is registered by phone number
export const checkPhoneRegistration = async (phoneNumber: string): Promise<{ isRegistered: boolean; message: string }> => {
  return api.post('/check-phone', { phoneNumber });
};

// 3. Register/Update user details
export const registerUser = async (userDetails: {
  name: string;
  email: string;
  location: string;
  secondaryPhoneNumber: string;
  primaryPhoneNumber: string;
}): Promise<{ status: boolean; message: string; user?: any }> => {
  return api.put('/register', userDetails);
};

// 4. Check if email is registered (LOGIN)
export const checkEmailRegistration = async (email: string): Promise<{ isRegistered: boolean; message: string }> => {
  return api.post('/check-email', { email });
};

// 5. Validate login credentials
export const validateLoginCredentials = async (email: string, phoneNumber: string): Promise<{ belongsToSameUser: boolean; message: string; userData?: any }> => {
  return api.post('/check-user', { email, phoneNumber });
};




