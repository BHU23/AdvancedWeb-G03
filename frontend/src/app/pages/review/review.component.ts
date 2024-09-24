import { Component } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getReviews().subscribe({
      next: (response) => {
        this.reviews = response;
        console.log(this.reviews); // Update places with the fetched reviews
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
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
}
