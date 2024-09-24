import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Planning } from '../../components/planing-form/planing-form.component';
import { AuthService } from '../auth/auth.service';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { PlanOntime } from '../../components/subplanningform/subplanningform.component';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      // console.error('Token not found in getHeaders');
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  createPlace(placeData: any): Observable<any> {
    console.log('Creating place with data:', placeData);
    const headers = this.getHeaders();
    console.log('Headers:', headers);

    return this.http.post(`${this.apiUrl}/place`, placeData, { headers }).pipe(
      tap((response) => console.log('API Response:', response)),
      catchError((error) => {
        console.error('Error from API:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Error body:', error.error);
        }
        return throwError(() => error);
      })
    );
  }
}
