import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from '../../services/place/place.service';
import { ReviewService } from '../../services/review/review.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review-create',
  templateUrl: './createReview.component.html',
  styleUrls: ['./createReview.component.css'],
})
export class CreateReviewComponent implements OnInit {
  reviewForm: FormGroup;
  map: google.maps.Map | undefined;
  options: google.maps.MapOptions;
  markerPosition: { lat: number; lng: number } | null = null; // Initialize with null
  fileName: string | null = null;
  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private reviewService: ReviewService,
    private router: Router
  ) {
    this.options = {
      center: { lat: 14.882355192499178, lng: 102.02227905542762 },
      zoom: 15,
      mapId: '4b4b89db73562099',
    };

    this.reviewForm = this.fb.group({
      topic: ['', Validators.required],
      image: [null, Validators.required],
      rating: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      description: ['', Validators.required],
      trip_date: ['', Validators.required],
      reviewDate: [new Date(), Validators.required],
      timeRecommend: ['', Validators.required],
      cost: [null, Validators.required],
      userID: [null],
      placeId: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        address: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
        googleMapsUrl: ['', Validators.required],
        category: ['', Validators.required],
        rating: [null],
      }),
    });
  }

  ngOnInit(): void {}

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      const latlng = { lat: latitude, lng: longitude };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          // Get the formatted address (place name)
          console.log(results);
          const address = results[0].formatted_address;
          this.reviewForm.get('placeId')?.patchValue({
            // name: placeName,
            address: address,
          });
        } else {
          console.error(
            'Geocode was not successful for the following reason:',
            status
          );
        }
      });
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      this.markerPosition = { lat: latitude, lng: longitude };
      // Update form values
      this.reviewForm.get('placeId')?.patchValue({
        latitude: latitude,
        longitude: longitude,

        googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
      });
      console.log(this.reviewForm.value);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string; // base64 image
        this.reviewForm.patchValue({
          image: base64String, // Store base64 image as a string
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const placeData = {
        name: this.reviewForm.value.placeId.name,
        description: this.reviewForm.value.placeId.description,
        address: this.reviewForm.value.placeId.address,
        latitude: this.reviewForm.value.placeId.latitude,
        longitude: this.reviewForm.value.placeId.longitude,
        googleMapsUrl: this.reviewForm.value.placeId.googleMapsUrl,
        category: this.reviewForm.value.placeId.category,
        rating: this.reviewForm.value.rating,
      };

      // Step 1: Create the place
      this.placeService.createPlace(placeData).subscribe({
        next: (createdPlace: any) => {
          // Step 2: Get the Place ID from the created place response
          const placeId = createdPlace._id;

          // Step 3: Create the review using the place ID
          const reviewData = {
            topic: this.reviewForm.value.topic,
            image: this.reviewForm.value.image,
            rating: this.reviewForm.value.rating,
            description: this.reviewForm.value.description,
            trip_date: this.reviewForm.value.trip_date,
            reviewDate: this.reviewForm.value.reviewDate,
            timeRecommend: this.reviewForm.value.timeRecommend,
            cost: this.reviewForm.value.cost,
            placeID: placeId, // Use the newly created place ID
          };

          this.reviewService.createReview(reviewData).subscribe({
            next: () => {
              console.log('Review submitted successfully');
              // Optionally reset the form or navigate to another page
              this.reviewForm.reset();
              this.router.navigate(['/review']);
            },
            error: (err) => {
              console.error('Error submitting review:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error creating place:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
