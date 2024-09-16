import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planing-form',
  templateUrl: './planing-form.component.html',
  styleUrls: ['./planing-form.component.css']
})
export class PlaningFormComponent implements OnInit {
  planingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.planingForm = this.fb.group({
      tripTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.planingForm.valid) {
      console.log(this.planingForm.value);
      // Here you would typically save the form data or emit an event to the parent component
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.planingForm.controls).forEach(field => {
        const control = this.planingForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  resetForm() {
    this.planingForm.reset();
    // Optionally, you can reinitialize the form to its default state
    // this.initForm();
  }
}