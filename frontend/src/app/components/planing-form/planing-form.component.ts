import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';
import { Service } from '../../services/shareServices/plannig-noti.service';

export interface Planning {
  _id: string;
  tripID: number;
  tripName: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  budget: string;
  status: string;
  userID: {
    _id: string;
    title: string | number;
    firstName: string | number;
    lastName: string | number;
    gender: string | number;
  };
  createAt: string;
  updateAt: string;
}

@Component({
  selector: 'app-planing-form',
  templateUrl: './planing-form.component.html',
  styleUrls: ['./planing-form.component.css'],
})
export class PlaningFormComponent implements OnInit {
  planingForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private planingService: PlaningService,
    private planningNotificationService: Service
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 2, 11, 31);  // Set max date to 2 years from now
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.planingForm = this.fb.group({
      tripName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      startDate: ['', [Validators.required, this.dateValidator()]],
      endDate: ['', [Validators.required, this.dateValidator()]],
      budget: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    }, { validators: this.dateRangeValidator });
  }

  dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      if (inputDate < this.minDate || inputDate > this.maxDate) {
        return { dateOutOfRange: true };
      }
      return null;
    };
  }

  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        return { dateRange: true };
      }
    }
    return null;
  }

  get tripName() { return this.planingForm.get('tripName'); }
  get startDate() { return this.planingForm.get('startDate'); }
  get endDate() { return this.planingForm.get('endDate'); }
  get budget() { return this.planingForm.get('budget'); }
  get description() { return this.planingForm.get('description'); }

  onSubmit() {
    if (this.planingForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const planningData: Partial<Planning> = this.planingForm.value;
      this.planingService.createPlanning(planningData).subscribe({
        next: (response) => {
          console.log('Planning created successfully', response);
          this.successMessage = 'บันทึกข้อมูลการวางแผนท่องเที่ยวสำเร็จ';
          this.planningNotificationService.notifyPlansUpdated();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating planning', error);
          this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + (error.message || 'โปรดลองอีกครั้งในภายหลัง');
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched(this.planingForm);
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง';
    }
  }

  resetForm() {
    this.planingForm.reset();
    this.planingForm.markAsPristine();
    this.planingForm.markAsUntouched();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  closeAlert(type: string) {
    if (type === 'success') {
      this.successMessage = '';
    } else if (type === 'error') {
      this.errorMessage = '';
    }
  }
}
