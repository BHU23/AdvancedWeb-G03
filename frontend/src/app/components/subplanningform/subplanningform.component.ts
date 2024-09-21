import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface PlanOntime {
  planID?: number;
  planName: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  budget: number;
  image: Record<string, string>;
  status: string;
  placeID: Object; // Changed to ObjectId
  planningID: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface Place {
  _id: Object; // Changed from placeID to _id
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
  styleUrls: ['./subplanningform.component.css']
})
export class SubplanningformComponent implements OnInit {
  subPlanningForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;
  places: Place[] = [];
  selectedPlace: Place | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubplanningformComponent>,
    private planontimeService: PlaningService,
    @Inject(MAT_DIALOG_DATA) public data: { planningID: string }
  ) {}

  ngOnInit() {
    this.loadPlaces();
    this.initForm();
  }

  initForm() {
    this.subPlanningForm = this.fb.group({
      planName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['Planned'],
      placeID: ['', Validators.required],
      planningID: [this.data.planningID, Validators.required]
    });
  }

  loadPlaces() {
    this.planontimeService.getLocationData().subscribe({
      next: (places: Place[]) => {
        this.places = places;
      },
      error: (error) => {
        console.error('Error loading places:', error);
        this.errorMessage = 'เกิดข้อผิดพลาดในการโหลดข้อมูลสถานที่';
      }
    });
  }

  onPlaceSelected(placeId: string) {
    this.selectedPlace = this.places.find(place => place._id.toString() === placeId) || null;
    if (this.selectedPlace) {
      this.subPlanningForm.patchValue({
        placeID: this.selectedPlace._id
      });
    }
  }

  onSubmit() {
    if (this.subPlanningForm.valid) {
      this.isSubmitting = true;
      const formData: Partial<PlanOntime> = {
        ...this.subPlanningForm.value,
        startTime: new Date(this.subPlanningForm.value.startTime),
        endTime: new Date(this.subPlanningForm.value.endTime),
        image: {},
        placeID: new Object(this.subPlanningForm.value.placeID) // Convert to ObjectId
      };

      this.planontimeService.createSubPlanning(formData).subscribe({
        next: (response) => {
          console.log('Subplanning created successfully:', response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error creating subplanning:', error);
          this.errorMessage = 'เกิดข้อผิดพลาดในการสร้างแผนย่อย กรุณาลองใหม่อีกครั้ง';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
