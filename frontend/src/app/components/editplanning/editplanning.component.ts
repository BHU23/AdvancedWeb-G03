import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Planning } from '../planing-form/planing-form.component';
import { PlaningService } from '../../services/planing/planing-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editplanning',
  templateUrl: './editplanning.component.html',
  styleUrl: './editplanning.component.css'
})
export class EditplanningComponent implements OnInit {
  editForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  minDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private planingService: PlaningService,
    public dialogRef: MatDialogRef<EditplanningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { planning: Planning }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editForm = this.formBuilder.group({
      tripName: [this.data.planning.tripName, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startDate: [this.data.planning.startDate, [Validators.required, this.pastDateValidator]],
      endDate: [this.data.planning.endDate, [Validators.required, this.pastDateValidator]],
      budget: [this.data.planning.budget, Validators.required],
      description: [this.data.planning.description, Validators.maxLength(500)]
    }, { validators: this.dateRangeValidator });
  }


  dateRangeValidator(formGroup: FormGroup): ValidationErrors | null {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        return { dateRangeInvalid: true }; 
      }
    }

    return null;
  }


  pastDateValidator(control: AbstractControl): {[key: string]: any} | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate ? { 'pastDate': true } : null;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isSubmitting = true;
      const updatedPlanning = { ...this.data.planning, ...this.editForm.value };
      this.planingService.updatePlanning(this.data.planning._id, updatedPlanning).subscribe({
        next: response => {
          this.isSubmitting = false;
          this.dialogRef.close(response);
        },
        error: error => {
          this.isSubmitting = false;
          this.errorMessage = 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล';
          console.error('Error updating planning:', error);
        },
        complete: () => {
          console.log('Update process completed');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
