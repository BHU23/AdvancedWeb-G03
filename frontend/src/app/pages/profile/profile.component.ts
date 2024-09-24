import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService, DecodedToken } from '../../services/auth/auth.service'; // Import AuthService
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Service } from '../../services/shareServices/plannig-noti.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  errorMessage: string | null = null;
  avatarPreview: string | ArrayBuffer | null = null;
  userData: DecodedToken | null = null;
  StrongPhoneRegx: RegExp = /^[0-9]{10}$/;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private userService: Service,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.StrongPhoneRegx)],
      ],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      avatar: ['', Validators.required],
    });

    // Load profile data
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.userData$.subscribe((userData) => {
      if (userData) {
        this.userData = userData;
        this.profileForm.patchValue({
          title: userData.title || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          gender: userData.gender || '',
          address: userData.address || '',
          avatar: userData.avatar || '',
        });
        this.avatarPreview = userData.avatar || null; // Show avatar preview
      }
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
        this.profileForm.patchValue({ avatar: this.avatarPreview });
      };

      reader.readAsDataURL(file);
    }
  }

  onUpdate(): void {
    if (this.profileForm.valid) {
      const userId = String(this.userData?.id);
      console.log('userId', userId);

      // Show confirmation alert
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update your profile?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with profile update if confirmed
          this.profileService
            .updateProfile(userId, this.profileForm.value)
            .subscribe(
              (response) => {
                console.log('Profile updated successfully', response);

                // Show success alert
                Swal.fire({
                  title: 'Success!',
                  text: 'Profile updated successfully!',
                  icon: 'success',
                  timer: 1000, // Alert will close automatically after 3 seconds
                  showConfirmButton: false,
                }); 

                setTimeout(() => {
                   window.location.reload();
                }, 1000);
               
              },
              (error) => {
                console.error('Error updating profile', error);
                const errorMessage =
                  error.error.message ||
                  'Failed to update profile. Please try again.';

                // Show error alert
                Swal.fire({
                  title: 'Error!',
                  text: errorMessage,
                  icon: 'error',
                  confirmButtonText: 'Close',
                });
              }
            );
        } else {
          // Show cancel alert if needed
          Swal.fire({
            title: 'Cancelled',
            text: 'Your profile update has been cancelled.',
            icon: 'info',
            confirmButtonText: 'Close',
          });
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields.';
      Swal.fire({
        title: 'Warning!',
        text: this.errorMessage,
        icon: 'warning',
        confirmButtonText: 'Close',
      });
    }
  }
}
