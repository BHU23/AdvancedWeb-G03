import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export interface TripPlan {
  id: string;
  generalInfo: {
    tripName: string;
    destination: string;
    startDate: Date;
    endDate: Date;
  };
  itinerary: {
    dailyPlans: { activities: string }[];
  };
  budget: {
    totalBudget: number;
    budgetAllocation: string;
  };
}


@Component({
  selector: 'app-planing-table',
  templateUrl: './planing-table.component.html',
  styleUrl: './planing-table.component.css'
})
export class PlaningTableComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
}
