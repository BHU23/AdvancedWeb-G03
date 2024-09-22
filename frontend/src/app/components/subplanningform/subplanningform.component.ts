import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface PlanOntime {
  _id: string;
  planID?: number;
  planName: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  budget: number;
  image: Record<string, string>;
  status: string;
  placeID: Object;
  planningID: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface Place {
  _id: Object;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  googleMapsUrl?: string;
  category?: string;
  rating?: number;
  createAt?: Date;
  updateAt?: Date;
}

@Component({
  selector: 'app-subplanningform',
  templateUrl: './subplanningform.component.html',
  styleUrls: ['./subplanningform.component.css'],
})
export class SubplanningformComponent implements OnInit {
  subPlanningForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;
  places$: Observable<Place[]> | undefined;
  selectedPlace: Place | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubplanningformComponent>,
    private planontimeService: PlaningService,
    @Inject(MAT_DIALOG_DATA) public data: { planningID: string }
  ) {}

  ngOnInit() {
    this.initForm();
    this.places$ = this.loadPlaces(); // Assign the observable here
  }

  initForm() {
    this.subPlanningForm = this.fb.group({
      planName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['Planned'],
      placeID: ['', Validators.required],
      planningID: [this.data.planningID, Validators.required],
    });
  }

  // Modify loadPlaces to return the observable directly
  loadPlaces(): Observable<Place[]> {
    return this.planontimeService.getLocationData();
  }

  onPlaceSelected(placeId: string) {
    this.places$?.subscribe((places) => {
      this.selectedPlace =
        places.find((place) => place._id.toString() === placeId) || null;
      if (this.selectedPlace) {
        this.subPlanningForm.patchValue({
          placeID: this.selectedPlace._id,
        });
      }
    });
  }

  onSubmit() {
    if (this.subPlanningForm.valid) {
      this.isSubmitting = true;
      const formData: Partial<PlanOntime> = {
        ...this.subPlanningForm.value,
        startTime: new Date(this.subPlanningForm.value.startTime),
        endTime: new Date(this.subPlanningForm.value.endTime),
        image: {},
        placeID: new Object(this.subPlanningForm.value.placeID), // Convert to ObjectId
      };

      this.planontimeService.createSubPlanning(formData).subscribe({
        next: (response) => {
          console.log('Subplanning created successfully:', response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error creating subplanning:', error);
          this.errorMessage =
            'เกิดข้อผิดพลาดในการสร้างแผนย่อย กรุณาลองใหม่อีกครั้ง';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
