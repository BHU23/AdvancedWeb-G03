import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService, DecodedToken } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private plansUpdatedSource = new BehaviorSubject<void>(undefined);
  plansUpdated$ = this.plansUpdatedSource.asObservable();

  private userDataSource = new BehaviorSubject<DecodedToken | null>(null);
  userData$ = this.userDataSource.asObservable();

  constructor(private authService: AuthService) {
    // Fetch user data when the service is initialized
    this.authService.getUserdata().subscribe((data) => {
      this.userDataSource.next(data);
      console.log('userData', data); 
    });
  }

  notifyPlansUpdated() {
    this.plansUpdatedSource.next();
  }
  updateUserData(newData: DecodedToken): void {
    this.userDataSource.next(newData);
  }
}
