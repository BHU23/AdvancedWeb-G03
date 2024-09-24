import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  avatar: string | ArrayBuffer | null = null; // Declare avatar
  errorMessage: string | null = null; // To hold error messages if any
document: any;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.profileForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if required
  }

  get f() {
    return this.profileForm.controls;
  }

  // Method to handle file input changes
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar = reader.result; // Set avatar to the base64 string
      };
    }
  }

  // Method to handle form submission
  onUpdate(): void {
    if (this.profileForm.valid) {
      // Your update logic here
      console.log('Form Submitted', this.profileForm.value);
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
