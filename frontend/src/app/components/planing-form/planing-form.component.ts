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
  userID?: number | string;
}


@Component({
  selector: 'app-planing-form',
  templateUrl: './planing-form.component.html',
  styleUrls: ['./planing-form.component.css']
})
export class PlaningFormComponent implements OnInit {
  planingForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private planingService: PlaningService
  ) {}

  ngOnInit() {
    this.initForm();
  }

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
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';


      const planningData: Partial<Planning> = this.planingForm.value;
      this.planingService.createPlanning(planningData).subscribe(
        (response) => {
          console.log('Planning created successfully', response);
          this.successMessage = 'บันทึกข้อมูลการวางแผนท่องเที่ยวสำเร็จ';
          this.resetForm();
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error creating planning', error);
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      );
    } else {
      this.markFormGroupTouched(this.planingForm);
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
    }
  }

  resetForm() {
    this.planingForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
