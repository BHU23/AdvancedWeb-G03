import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaningComponent } from './planing.component';
import { SubPlaningComponent } from '../../pages/sub-planing/sub-planing.component';

const routes: Routes = [
  { path: '', component: PlaningComponent },
  { path: ':id', component: SubPlaningComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
