import { Component } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getReviews().subscribe({
      next: (response) => {
        this.reviews = response; 
        console.log(this.reviews)// Update places with the fetched reviews
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
    });
  }
}
