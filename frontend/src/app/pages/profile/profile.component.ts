import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from '../../services/shareServices/plannig-noti.service';
import { DecodedToken } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Fix typo: 'styleUrl' should be 'styleUrls'
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: DecodedToken | null = null; // To hold the user data
  private userDataSubscription!: Subscription; // To manage subscription

  constructor(private userService: Service) {}

  ngOnInit(): void {
    // Subscribe to userData$ observable
    this.userDataSubscription = this.userService.userData$.subscribe((data) => {
      this.userData = data;
      console.log('User Data in ProfileComponent:', this.userData);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
