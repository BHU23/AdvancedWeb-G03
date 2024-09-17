import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';

export interface Planning {
  tripID: number;
  tripName: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  budget: string;
  status: string;
  userID: Number;
}

@Component({
  selector: 'app-planing-form',
  templateUrl: './planing-form.component.html',
  styleUrls: ['./planing-form.component.css']
})
export class PlaningFormComponent implements OnInit {
  planingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private PlaningService: PlaningService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  successMessage: string = '';
  errorMessage: string = '';


  initForm() {
    this.planingForm = this.fb.group({
      tripName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.planingForm.valid) {
      const planningData: Planning = this.planingForm.value;
      this.PlaningService.createPlanning(planningData).subscribe(
        (response) => {
          if (response) {
            console.log('Planning created successfully', response);
            this.successMessage = 'บันทึกข้อมูลการวางแผนท่องเที่ยวสำเร็จ';
            this.errorMessage = '';
            this.resetForm();
          } else {
            // Handle the case where response is null
            this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
            this.successMessage = '';
          }
        },
        (error) => {
          console.error('Error creating planning', error);
          this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
          this.successMessage = '';
        }
      );
    } else {
      Object.keys(this.planingForm.controls).forEach(field => {
        const control = this.planingForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  resetForm() {
    this.planingForm.reset();
  }
}
