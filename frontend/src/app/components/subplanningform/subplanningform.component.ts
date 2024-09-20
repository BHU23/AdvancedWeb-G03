import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlanOntime } from '../planing-table/planing-table.component';

@Component({
  selector: 'app-subplanningform',
  templateUrl: './subplanningform.component.html',
  styleUrls: ['./subplanningform.component.css']
})
export class SubplanningformComponent implements OnInit {
  subPlanningForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubplanningformComponent>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subPlanningForm = this.fb.group({
      planName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      reviewID: ['', Validators.required],
      locationID: ['', Validators.required],
      planningID: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.subPlanningForm.valid) {
      this.isSubmitting = true;
      const formData: PlanOntime = {
        ...this.subPlanningForm.value,
        startTime: new Date(this.subPlanningForm.value.startTime),
        endTime: new Date(this.subPlanningForm.value.endTime)
      };
      console.log('Submitting:', formData);
      this.dialogRef.close(formData);
    } else {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
