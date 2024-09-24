import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/auth/signup.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')]), // Element entering
    ]),
  ],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string | null = null;
  isPasswordVisible: boolean = false;

  StrongPasswordRegx: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      avatar: [''],
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.markAllAsTouched();

    if (this.signupForm.invalid) {
      return;
    }

    this.signupService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        this.showSuccessAlert();
        this.router.navigate(['/login']);
      },
      (error: any) => {
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

  private showSuccessAlert(): void {
    Swal.fire({
      title: 'สำเร็จ!',
      text: 'ลงทะเบียนสำเร็จแล้ว!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ตกลง',
    });
  }

}
