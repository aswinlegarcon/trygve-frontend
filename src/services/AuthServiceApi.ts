const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL + '/user'

// Helper function to get Firebase token from localStorage
const getFirebaseToken = (): string | null => {
  return localStorage.getItem('firebase_jwt');
};

// Helper function to make requests WITHOUT token in body
const makeRequest = async (url: string, method: 'POST' | 'PUT', data: any = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Helper function to make requests WITH token in body (only for /auth)
const makeRequestWithTokenInBody = async (url: string) => {
  const token = getFirebaseToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    token
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 1. Verify Firebase token with backend
export const verifyFirebaseToken = async (): Promise<{ success: boolean; message: string }> => {
  return makeRequestWithTokenInBody('/auth');
};

// 2. Check if user is registered by phone number
export const checkPhoneRegistration = async (phoneNumber: string): Promise<{ isRegistered: boolean; message: string }> => {
  return makeRequest('/check-phone', 'POST', { phoneNumber });
};

// 3. Register/Update user details
export const registerUser = async (userDetails: {
  name: string;
  email: string;
  location: string;
  secondaryPhoneNumber: string;
  primaryPhoneNumber: string;
}): Promise<{ status: boolean; message: string; user?: any }> => {
  return makeRequest('/register', 'PUT', userDetails);
};

// 4. Check if email is registered (LOGIN)
export const checkEmailRegistration = async (email: string): Promise<{ isRegistered: boolean; message: string }> => {
  return makeRequest('/check-email', 'POST', { email });
};

// 5. Validate login credentials
export const validateLoginCredentials = async (email: string, phoneNumber: string): Promise<{ belongsToSameUser: boolean; message: string; userData?: any }> => {
  return makeRequest('/check-user', 'POST', { email, phoneNumber });
};




