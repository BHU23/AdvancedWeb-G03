import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, DecodedToken } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Service {
  // Consider renaming from `Service` to a more descriptive name
  private plansUpdatedSource = new BehaviorSubject<void>(undefined);
  plansUpdated$ = this.plansUpdatedSource.asObservable();

  private userDataSource = new BehaviorSubject<DecodedToken | null>(null);
  userData$ = this.userDataSource.asObservable();

  private apiUrl = 'http://localhost:3000/api/customer'; // Replace with your actual API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {
    // Fetch user data when the service is initialized
    this.authService.getCurrentUserId().subscribe((userId) => {
      if (userId) {
        this.fetchUserById(String(userId));
      }
    });
  }
  notifyPlansUpdated() {
    this.plansUpdatedSource.next();
  }

  updateUserData(newData: DecodedToken): void {
    this.userDataSource.next(newData);
  }

  // Method to fetch user by ID
  fetchUserById(userId: string): void {
    const headers = this.getHeaders(); // Get headers with token
    this.http
      .get<any>(`${this.apiUrl}/${userId}`, { headers }) // Use 'any' for the response type
      .pipe(
        catchError((error) => {
          console.error('Error fetching user data:', error);
          return of(null);
        })
      )
      .subscribe((data) => {
        console.log('Fetched user data:', data);

       
      if (data) {
        const decodedUser: DecodedToken = {
          title: data.title, // Map title
          userID: data.userID, // Map userID
          id: data._id, // Map _id to id
          email: data.email, // Map email
          firstName: data.firstName, // Map firstName
          lastName: data.lastName, // Map lastName
          gender: data.gender, // Map gender
          address: data.address, // Map address
          phoneNumber: data.phoneNumber, // Map phoneNumber
          avatar: data.avatar, // Map avatar
          createdAt: new Date(data.createdAt), // Convert createdAt to Date object
          updatedAt: new Date(data.updatedAt), // Convert updatedAt to Date object
        };

        this.userDataSource.next(decodedUser); // Update the userDataSource with the mapped data
      }
    });
   
  }

  // Private method to get headers including authorization token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      // Token not found, return headers without authorization
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }
}
