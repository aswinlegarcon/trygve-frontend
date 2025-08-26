// src/services/jwtService.ts
export interface UserData {
  token: string;
  tokenType: string;
  userId: number;
  email: string;
  phoneNumber: string;
}

export class JWTService {
  private static readonly JWT_KEY = 'auth_token';
  private static readonly USER_DATA_KEY = 'user_data';
  private static readonly EXPIRY_KEY = 'token_expiry';

  static setAuthData(userData: UserData, expirationHours: number = 24): void {
    const expirationTime = Date.now() + (expirationHours * 60 * 60 * 1000);
    
    localStorage.setItem(this.JWT_KEY, userData.token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    localStorage.setItem(this.EXPIRY_KEY, expirationTime.toString());
    
    console.log('Auth data stored successfully');
  }

  static getToken(): string | null {
    if (this.isTokenExpired()) {
      this.clearAuth();
      return null;
    }
    return localStorage.getItem(this.JWT_KEY);
  }

  static getUserData(): UserData | null {
    if (this.isTokenExpired()) {
      this.clearAuth();
      return null;
    }
    
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  static isTokenExpired(): boolean {
    const expiryTime = localStorage.getItem(this.EXPIRY_KEY);
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  }

  static clearAuth(): void {
    localStorage.removeItem(this.JWT_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
    localStorage.removeItem('firebase_jwt');
    console.log('Auth data cleared');
  }
}