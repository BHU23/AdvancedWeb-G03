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
export class ReviewService {
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

  getReviews(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/reviews`, { headers });
  }

  getReviewByID(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/review/${id}`, { headers });
  }

  createReview(reviewData: any): Observable<any> {
    console.log('Creating review with data:', reviewData);
    const headers = this.getHeaders();
    console.log('Headers:', headers);

    return this.authService.getCurrentUserId().pipe(
      switchMap((userID) => {
        if (userID === null) {
          console.error('User not authenticated');
          return throwError(() => new Error('User not authenticated'));
        }

        const completeData = { ...reviewData, userID: userID.toString() }; // Add userID to review data
        console.log('Complete data to be sent:', completeData);

        return this.http
          .post(`${this.apiUrl}/review`, completeData, { headers })
          .pipe(
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
      })
    );
  }

  incrementViewCount(id: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/review/${id}/views`; // New endpoint for view count
    return this.http.patch<any>(url, {}, { headers }); // Send an empty body since we are just incrementing
  }

  incrementLikeCount(id: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/review/${id}/likes`; // New endpoint for like count
    return this.http.patch<any>(url, {}, { headers }); // Send an empty body since we are just incrementing
  }

  getCommentsByReviewID(reviewID: string): Observable<any[]> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/reviews/${reviewID}/comments`; // Adjust the endpoint as necessary
    return this.http.get<any[]>(url, {headers});
  }
}
