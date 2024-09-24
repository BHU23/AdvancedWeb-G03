import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaningComponent } from './pages/planing/planing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReviewComponent } from './pages/review/review.component';
import { CreateReviewComponent } from './components/createReview/createReview.component';
import { SubPlaningComponent } from './pages/sub-planing/sub-planing.component';
import { SubReviewComponent } from './components/sub-review/sub-review.component';

// const routes: Routes = [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'review/create', component: CreateReviewComponent },
  { path: 'review/:id', component: SubReviewComponent },
  { path: 'planning', component: PlaningComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'planning/:id', component: SubPlaningComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
