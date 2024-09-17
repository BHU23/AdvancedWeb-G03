import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planning} from '../../components/planing-form/planing-form.component';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaningService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllPlannings(): Observable<Planning[]> {
    return this.http.get<Planning[]>(`${this.apiUrl}/plannings`);
  }

  getPlanningById(id: number): Observable<Planning> {
    return this.http.get<Planning>(`${this.apiUrl}/planning/${id}`);
  }

  createPlanning(planningData: Planning): Observable<Planning> {
    return this.http.post<any>(`${this.apiUrl}/planning`, planningData);
  }

  updatePlanning(id: number, planningData: Planning): Observable<Planning> {
    return this.http.put<Planning>(`${this.apiUrl}/planning/${id}`, planningData);
  }

  deletePlanning(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/planning/${id}`);
  }
}
