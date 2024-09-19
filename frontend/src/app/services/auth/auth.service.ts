import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
interface DecodedToken {
  userID?: number; // to match the provided data structure
  id?: string;    // fallback to ObjectId if userID is not present
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!this.getToken();
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('token', token);
    }
  }

  getCurrentUserId(): Observable<number | string | null> {
    const token = this.getToken();
    console.log('Retrieved token:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('Decoded token:', decodedToken);

        const userID = decodedToken.id;
        if (userID) {
          console.log('Current user ID:', userID);
          return of(userID);
        } else {
          console.log('User ID not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }

    return of(null);
  }

}
