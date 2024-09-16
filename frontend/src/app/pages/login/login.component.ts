import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';
interface LoginResponse {
  token: string;
  result: any; 
  status: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
  
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Define loginForm as a FormGroup
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form in ngOnInit using FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response: LoginResponse) => {
        const storage = this.loginForm.value.rememberMe
          ? localStorage
          : sessionStorage;
        storage.setItem('token', response.token);
        this.router.navigate(['/']); 
      },
      (error: any) => {
        this.errorMessage = error.error?.message || 'Login failed';
      }
    );
  }
}
