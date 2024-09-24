import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  title: string;
  userID?: number;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';
  private datatauser: DecodedToken | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        this.setCurrentUserId(response.token);
      })
    );
  }

  private setCurrentUserId(token: string): void {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        this.datatauser = decodedToken;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    this.datatauser = null;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string, rememberMe: boolean): void {
    if (typeof window !== 'undefined') {
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
    }
  }

  getUserdata(): Observable<DecodedToken | null> {
    const token = this.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return of(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    return of(null);
  }

  getCurrentUserId(): Observable<number|string | null> {
    const token = this.getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        // Assuming the decoded token contains an 'id' property
        return of(decodedToken?.id || null); 
      } catch (error) {
        console.error('Error decoding token:', error);
        return of(null); // Return null if there's an error in decoding
      }
    }

    return of(null); // Return null if there's no token
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
}
