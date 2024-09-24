import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review/review.service';

@Component({
  selector: 'app-sub-review',
  templateUrl: './sub-review.component.html',
  styleUrls: ['./sub-review.component.css'], // Fix: Corrected to 'styleUrls'
})
export class SubReviewComponent {
  review: any | null = null;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('th');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the review ID from the URL

    if (id) {
      this.reviewService.getReviewByID(id).subscribe((data) => {
        this.review = data;
        console.log(data);
      });
    }
  }

  likeReview(id: string) {
    this.reviewService.incrementLikeCount(id).subscribe({
      next: (updatedReview) => {
        // Directly update the review object with the updated one
        this.review = updatedReview; // Replace the old review with the updated one
      },
      error: (error) => {
        console.error('Error incrementing like count:', error);
      },
    });
  }
}
