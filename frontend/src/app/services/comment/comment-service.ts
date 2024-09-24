import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api'; // Update with your API endpoint

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
  // Add a new comment
  addComment(commentData: {
    userComments: string;
    reviewID: string;
    userID: string;
    parentCommentID?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment`, commentData, {
      headers: this.getHeaders(),
    });
  }

  getCommentsByParentId(parentCommentId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/comments/parent/${parentCommentId}`,
      { headers: this.getHeaders() }
    );
  }
}
