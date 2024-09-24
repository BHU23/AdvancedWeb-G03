import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review.component';
import { CreateReviewComponent } from '../../components/createReview/createReview.component';
import { SubReviewComponent } from '../../components/sub-review/sub-review.component';

const routes: Routes = [
  { path: '', component: ReviewComponent },
  { path: 'create', component: CreateReviewComponent },
  { path: ':id', component: SubReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
