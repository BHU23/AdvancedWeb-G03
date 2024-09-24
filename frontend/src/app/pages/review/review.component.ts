import { Component } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  reviews: any[] = [];
  user: any | null = null;
  showMyReviews: boolean = false;
  filteredReviews: any[] = [];
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchReviews();
    this.getUserData();
  }

  getUserData() {
    this.authService.getUserdata().subscribe({
      next: (userData) => {
        this.user = userData; // Store the user ID from userData
      },
    });
  }

  fetchReviews() {
    this.reviewService.getReviews().subscribe((data: any[]) => {
      this.reviews = data; // Assuming data is an array of reviews
      this.filteredReviews = this.reviews; // Initially show all reviews
    });
  }

  viewReview(id: string) {
    this.reviewService.incrementViewCount(id).subscribe({
      next: () => {
        this.router.navigate(['/review', id]); // Navigate to the review details
      },
      error: (error) => {
        console.error('Error incrementing view count:', error);
      },
    });
  }

  toggleView() {
    this.showMyReviews = !this.showMyReviews; // Toggle the state
    this.filterReviews(); // Filter reviews based on the current state
  }

  filterReviews() {
    if (this.showMyReviews) {
      // Filter to show only the user's reviews
      this.filteredReviews = this.reviews.filter(
        (review) => review.userID._id === this.user.id
      );
    } else {
      // Show all reviews
      this.filteredReviews = this.reviews;
    }
  }
}
