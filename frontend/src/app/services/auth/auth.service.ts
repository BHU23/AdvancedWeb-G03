import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
export interface DecodedToken {
  userID?: number; // User ID from auto-increment
  id?: string; // MongoDB Object ID
  email?: string; // User's email
  firstName?: string; // User's first name
  lastName?: string; // User's last name
  gender?: string; // User's gender
  address?: string; // User's address
  phoneNumber?: string; // User's phone number
  avatar?: string; // Base64 string for the user's avatar
  createdAt?: Date; // Account creation date
  updatedAt?: Date; // Last update date
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
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  setToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  getCurrentUserId(): Observable<number | string | null> {
    const token = this.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('decodedToken', decodedToken);
        const userID = decodedToken.id;
        if (userID) {
          return of(userID);
        } else {
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
    }

    return of(null);
  }
  getUserdata(): Observable<DecodedToken | null> {
    const token = this.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('decodedToken', decodedToken);
        return of(decodedToken); // Return the decoded token as an observable
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    return of(null); // Return null as observable if token is not available
  }
}

