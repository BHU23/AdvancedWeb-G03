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
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] }, 
  {
    path: 'review/create',
    component: CreateReviewComponent,
    canActivate: [AuthGuard],
  }, 
  {
    path: 'review/:id',
    component: SubReviewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'planning', component: PlaningComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'planning/:id',
    component: SubPlaningComponent,
    canActivate: [AuthGuard],
  }, // Protect this route
  { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}