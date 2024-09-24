import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
