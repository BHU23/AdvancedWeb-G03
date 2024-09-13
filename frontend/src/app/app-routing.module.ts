import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaningComponent } from './pages/planing/planing.component';

// const routes: Routes = [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planning', component: PlaningComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
