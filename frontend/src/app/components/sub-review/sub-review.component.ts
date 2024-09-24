import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review/review.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommentService } from '../../services/comment/comment-service';

@Component({
  selector: 'app-sub-review',
  templateUrl: './sub-review.component.html',
  styleUrls: ['./sub-review.component.css'], // Fix: Corrected to 'styleUrls'
})
export class SubReviewComponent {
  review: any | null = null;
  comments: any[] = [];
  userComment: string = '';
  user: any | null = null;
  newReply: { [key: string]: string } = {};
  organizedComments: { parent: any; children: any[] }[] = [];
  toggleReplyVisibility: { [key: string]: boolean } = {};

  constructor(
    private reviewService: ReviewService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('th');
  }

  toggleReply(commentId: string) {
    this.toggleReplyVisibility[commentId] =
      !this.toggleReplyVisibility[commentId];
  }

  fetchComments(reviewId: string): void {
    this.reviewService.getCommentsByReviewID(reviewId).subscribe((comments) => {
      this.comments = comments;
      this.organizedComments = this.organizeComments(comments);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the review ID from the URL

    if (id) {
      this.reviewService.getReviewByID(id).subscribe((data) => {
        this.review = data;
        console.log(data);
        this.fetchComments(id); //
      });
    }
    this.getUserData();
  }
  getUserData() {
    this.authService.getUserdata().subscribe({
      next: (userData) => {
        this.user = userData; // Store the user ID from userData
      },
    });
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

  addComment() {
    const reviewID = this.review._id; // Assuming review is loaded
    const userID = this.user.id; // Replace with the actual user ID, e.g., from a service
    const newComment: any = {
      userComments: this.userComment,
      reviewID: reviewID,
      userID: userID,
      parentCommentID: null, // Set this if it's a reply to another comment
    };

    this.commentService.addComment(newComment).subscribe({
      next: (addedComment) => {
        this.comments.push(addedComment); // Add the new comment to the local array
        this.userComment = ''; // Clear the textarea
        this.fetchComments(this.review._id);
      },
    });
  }

  submitReply(commentId: string) {
    const replyContent = this.newReply[commentId]; // Get the reply content
    if (replyContent) {
      const replyData = {
        userComments: replyContent,
        reviewID: this.review._id,
        userID: this.user.id, // Replace with actual user ID from your auth service
        parentCommentID: commentId,
      };

      this.commentService.addComment(replyData).subscribe((newComment) => {
        console.log('Reply added:', newComment);
        this.newReply[commentId] = ''; // Clear the reply input
        this.toggleReply(commentId)
        this.fetchComments(this.review._id); // Refresh comments
      });
    }
  }
  organizeComments(comments: any[]): { parent: any; children: any[] }[] {
    const map = new Map<string, { parent: Comment; children: Comment[] }>();

    comments.forEach((comment) => {
      if (!comment.parentCommentID) {
        // Parent comment
        map.set(comment._id, { parent: comment, children: [] });
      } else {
        // Child comment
        const parentKey = comment.parentCommentID;
        if (map.has(parentKey)) {
          map.get(parentKey)!.children.push(comment);
        }
      }
    });

    return Array.from(map.values());
  }
}
