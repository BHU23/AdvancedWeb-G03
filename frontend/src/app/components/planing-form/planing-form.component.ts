import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planing-form',
  templateUrl: './planing-form.component.html',
  styleUrl: './planing-form.component.css'
})
export class PlaningFormComponent {
  planingForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    }
  }
}
