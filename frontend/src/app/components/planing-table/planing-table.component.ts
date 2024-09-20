import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export interface PlanOntime {
  planID?: number;
  planName: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  budget: number;
  feeling?: string;
  rating?: number;
  image?: Record<string, string>;
  status: string;
  reviewID?: string;
  locationID?: string;
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


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  searchTerm: string = '';
  openCreatePlanDialog() {
    // เปิด dialog เพื่อสร้าง PlanOntime ใหม่
    console.log('Opening Create PlanOntime Dialog');
  }
}
