import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Planning } from '../../components/planing-form/planing-form.component';
import { AuthService } from '../auth/auth.service';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaningService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
    } else {
      console.error('Token not found in getHeaders');
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }


  getUserPlannings(): Observable<Planning[]> {
    return this.authService.getCurrentUserId().pipe(
      tap(userID => console.log('This is Current User ID:', userID)),
      switchMap(userID => {
        if (userID === null) {
          throw new Error('User not authenticated');
        }

        const headers = this.getHeaders();
        return this.http.get<Planning[]>(`${this.apiUrl}/planning/${userID}`, { headers });
      }),
      catchError(this.handleError)
    );
  }


  createPlanning(planningData: Partial<Planning>): Observable<any> {
    console.log('Creating planning with data:', planningData);
    const headers = this.getHeaders();
    console.log('Headers:', headers);

    return this.authService.getCurrentUserId().pipe(
        tap(userID => console.log('This is Current User ID:', userID)),
        switchMap(userID => {
            if (userID === null) {
                console.error('User not authenticated');
                return throwError(() => new Error('User not authenticated'));
            }

            const completeData = { ...planningData, userID: userID.toString(), status: 'Planned' };
            console.log('Complete data to be sent:', completeData);

            return this.http.post(`${this.apiUrl}/planning`, completeData, { headers }).pipe(
                tap(response => console.log('API Response:', response)),
                catchError(error => {
                    console.error('Error from API:', error);
                    if (error instanceof HttpErrorResponse) {
                        console.error('Status:', error.status);
                        console.error('Error body:', error.error);
                    }
                    return throwError(() => error);
                })
            );
        }),
        catchError(this.handleError)
    );
}

  updatePlanning(id: number, planningData: Planning): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/planning/${id}`, planningData, { headers })
      .pipe(catchError(this.handleError));
  }

  deletePlanning(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/planning/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error('Server-side error:', error.status, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
