import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Service } from '../../services/shareServices/plannig-noti.service';
import { DecodedToken } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: DecodedToken | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private service: Service // Injecting the service
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Subscribe to user data from the PlanningNotificationService
    this.service.userData$.subscribe((data) => {
      this.userData = data; // Update userData with the latest value
      this.isLoggedIn = !!data; // Update isLoggedIn based on userData
    });
  }

  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
      this.isLoggedIn = false; // Ensure the login status is updated on logout
      this.userData = null; // Clear user data
    });
  }
}
