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


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'review', loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewRoutingModule) },
  { path: 'planning', loadChildren: () => import('./pages/planing/planing.module').then(m => m.PlanningRoutingModule) },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
