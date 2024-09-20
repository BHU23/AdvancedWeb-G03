import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SubplanningformComponent } from '../subplanningform/subplanningform.component';
import { MatDialog } from '@angular/material/dialog';

export interface PlanOntime {
  planID?: number;
  planName: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  budget: number;
  image: Record<string, string>;
  status: string;
  reviewID: string;
  locationID: string;
  planningID: string;
  createAt?: Date;
  updateAt?: Date;
}



@Component({
  selector: 'app-planing-table',
  templateUrl: './planing-table.component.html',
  styleUrl: './planing-table.component.css'
})
export class PlaningTableComponent {
  private _formBuilder = inject(FormBuilder);

  constructor(private dialog: MatDialog) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  searchTerm: string = '';
  openCreatePlanDialog() {
    const dialogRef = this.dialog.open(SubplanningformComponent, {
      width: '500px',
      data: {} // You can pass initial data here if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        // Handle the result here (e.g., save to database, update UI)
      }
    });
  }
}
