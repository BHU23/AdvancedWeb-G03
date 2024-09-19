import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';
import { PlanningNotificationService } from '../../services/shareServices/plannig-noti.service';

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
  styleUrls: ['./planing-form.component.css']
})
export class PlaningFormComponent implements OnInit {
  planingForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private planingService: PlaningService,
    private planningNotificationService: PlanningNotificationService // Inject the service
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.planingForm = this.fb.group({
      tripName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    });
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
      this.planingService.createPlanning(planningData).subscribe(
        (response) => {
          console.log('Planning created successfully', response);
          this.successMessage = 'บันทึกข้อมูลการวางแผนท่องเที่ยวสำเร็จ';

          // Notify other components about the update
          this.planningNotificationService.notifyPlansUpdated();

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
