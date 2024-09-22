import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/auth/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      avatar: [''],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    // Mark all controls as touched to trigger validation messages
    this.markAllAsTouched();

    if (this.signupForm.invalid) {
      return;
    }

    this.signupService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        // Handle successful signup
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login or another page
      },
      (error: any) => {
        // Handle error
        console.error('Signup error:', error);
        this.errorMessage =
          error.error.message || 'An error occurred during sign up';
      }
    );
  }

  private markAllAsTouched(): void {
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }
}
