import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PlaningService } from '../../services/planing/planing-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlaceService } from '../../services/place/place.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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
  map: google.maps.Map | undefined;
  options: google.maps.MapOptions;
  markerPosition: { lat: number; lng: number } | null = null;
  isCreatingNewPlace: boolean = false;
  minDate: Date = new Date();
  showPlaceSection = false;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private dialogRef: MatDialogRef<SubplanningformComponent>,
    private planontimeService: PlaningService,
    @Inject(MAT_DIALOG_DATA) public data: { planningID: string }
  ) {
    this.options = {
      center: { lat: 14.882355192499178, lng: 102.02227905542762 },
      zoom: 15,
      mapId: '4b4b89db73562099',
    };
  }

  ngOnInit() {
    this.initForm();
    this.places$ = this.loadPlaces();
  }

  initForm() {
    this.subPlanningForm = this.fb.group({
      planName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      budget: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['Planned', Validators.required],
      placeSelection: ['existing', Validators.required],
      existingPlaceID: [''],
      newPlace: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        description: ['', Validators.maxLength(500)],
        address: ['', [Validators.required, Validators.maxLength(200)]],
        latitude: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
        googleMapsUrl: ['', [Validators.pattern(/^https:\/\/.*$/)]],
        category: ['', [Validators.required, Validators.maxLength(50)]],
        rating: [null, [Validators.min(0), Validators.max(5)]],
      }),
      planningID: [this.data.planningID, Validators.required],
    }, { validators: [this.dateRangeValidator] });


    this.subPlanningForm.get('placeSelection')?.valueChanges.subscribe(value => {
      if (value === 'existing') {
        this.subPlanningForm.get('existingPlaceID')?.setValidators([Validators.required]);
        this.subPlanningForm.get('newPlace')?.disable();
      } else {
        this.subPlanningForm.get('existingPlaceID')?.clearValidators();
        this.subPlanningForm.get('newPlace')?.enable();
        this.subPlanningForm.get('newPlace')?.setValidators([Validators.required]);
      }
      this.subPlanningForm.get('existingPlaceID')?.updateValueAndValidity();
      this.subPlanningForm.get('newPlace')?.updateValueAndValidity();
    });

  }

  // Custom validator for date range
  dateRangeValidator(formGroup: FormGroup): ValidationErrors | null {
    const startTime = formGroup.get('startTime')?.value;
    const endTime = formGroup.get('endTime')?.value;

    if (startTime && endTime) {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      if (startDate >= endDate) {
        return { dateRange: 'End time must be after start time' };
      }
    }

    return null;
  }


  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng && this.subPlanningForm.get('placeSelection')?.value === 'new') {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      this.markerPosition = { lat: latitude, lng: longitude };

      this.subPlanningForm.get('newPlace')?.patchValue({
        latitude: latitude,
        longitude: longitude,
        googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
      });

      this.getGeocodedAddress(latitude, longitude);
      this.getPlaceDetails(latitude, longitude);
    }
  }

  getGeocodedAddress(latitude: number, longitude: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const address = results[0].formatted_address;
        this.subPlanningForm.get('newPlace')?.patchValue({
          address: address,
        });
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }

  getPlaceDetails(latitude: number, longitude: number) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const nearbyRequest: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(latitude, longitude),
      radius: 50,
      type: 'point_of_interest'
    };

    service.nearbySearch(nearbyRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {

        const specificPlace = results.find(place =>
          place.types && !place.types.includes('locality') && !place.types.includes('administrative_area_level_1')
        );

        const placeId = specificPlace ? specificPlace.place_id : results[0].place_id;

        if (placeId) {
          const detailRequest: google.maps.places.PlaceDetailsRequest = {
            placeId: placeId,
            fields: ['name', 'formatted_address', 'type', 'rating', 'url', 'vicinity']
          };

          service.getDetails(detailRequest, (place, detailStatus) => {
            if (detailStatus === google.maps.places.PlacesServiceStatus.OK && place) {
              const placeName = place.name || '';
              const placeCategory = place.types ? this.getCategoryFromTypes(place.types) : '';
              const placeDescription = place.vicinity || place.formatted_address || '';
              const placeRating = place.rating ? place.rating.toString() : '';
              const placeUrl = place.url || '';

              this.subPlanningForm.get('newPlace')?.patchValue({
                name: placeName,
                category: placeCategory,
                description: placeDescription,
                googleMapsUrl: placeUrl
              });

            } else {
              console.error('PlaceDetails request failed due to: ' + detailStatus);
            }
          });
        } else {
          console.error('No placeId found for the given location');
        }
      } else {
        console.error('NearbySearch request failed due to: ' + status);
      }
    });
  }


  private getCategoryFromTypes(types: string[]): string {
    const categoryMap: {[key: string]: string} = {
      'restaurant': 'ร้านอาหาร',
      'cafe': 'คาเฟ่',
      'park': 'สวนสาธารณะ',
      'museum': 'พิพิธภัณฑ์',
      'shopping_mall': 'ห้างสรรพสินค้า',
      'tourist_attraction': 'สถานที่ท่องเที่ยว',
    };

    for (const type of types) {
      if (categoryMap[type]) {
        return categoryMap[type];
      }
    }
    return 'สถานที่ท่องเที่ยว'; // Default category
  }

  loadPlaces(): Observable<Place[]> {
    return this.planontimeService.getLocationData();
  }

  onPlaceSelected(placeId: string) {
    this.places$?.subscribe((places) => {
      this.selectedPlace =
        places.find((place) => place._id.toString() === placeId) || null;
    });
  }

  onSubmit() {
    if (this.subPlanningForm.valid) {
      this.isSubmitting = true;
      const formData: Partial<PlanOntime> = {
        planName: this.subPlanningForm.value.planName,
        startTime: new Date(this.subPlanningForm.value.startTime),
        endTime: new Date(this.subPlanningForm.value.endTime),
        description: this.subPlanningForm.value.description,
        budget: this.subPlanningForm.value.budget,
        status: this.subPlanningForm.value.status,
        image: {},
        planningID: this.subPlanningForm.value.planningID,
      };

      if (this.subPlanningForm.value.placeSelection === 'existing') {
        formData.placeID = this.subPlanningForm.value.existingPlaceID;
        this.createSubPlanning(formData);
      } else {
        const newPlaceData = this.subPlanningForm.value.newPlace;
        this.placeService.createPlace(newPlaceData).subscribe({
          next: (createdPlace: any) => {
            formData.placeID = createdPlace._id;
            this.createSubPlanning(formData);
          },
          error: (error) => {
            console.error('Error creating new place:', error);
            this.errorMessage = 'เกิดข้อผิดพลาดในการสร้างสถานที่ใหม่';
            this.isSubmitting = false;
          }
        });
      }
    } else {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน';
    }
  }

  createSubPlanning(formData: Partial<PlanOntime>) {
    this.planontimeService.createSubPlanning(formData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error creating sub-planning:', error);
        this.errorMessage = 'เกิดข้อผิดพลาดในการสร้างแผนย่อย';
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
