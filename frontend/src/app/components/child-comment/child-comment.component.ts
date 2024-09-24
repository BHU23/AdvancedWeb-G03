import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment/comment-service';

@Component({
  selector: 'app-child-comment',
  templateUrl: './child-comment.component.html',
})
export class ChildCommentComponent implements OnInit {
  @Input() parentCommentId!: string;
  childComments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.fetchChildComments();
    console.log(this.parentCommentId)
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('th');
  }

  fetchChildComments() {
    this.commentService
      .getCommentsByParentId(this.parentCommentId)
      .subscribe((data: any) => {
        this.childComments = data;
        console.log(data);
      });
  }
}
