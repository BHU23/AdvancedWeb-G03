import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SubplanningformComponent } from '../subplanningform/subplanningform.component';
import { MatDialog } from '@angular/material/dialog';
import { Planning } from '../planing-form/planing-form.component';
import { ActivatedRoute } from '@angular/router';
import { PlaningService } from '../../services/planing/planing-service.service';

@Component({
  selector: 'app-planing-table',
  templateUrl: './planing-table.component.html',
  styleUrl: './planing-table.component.css'
})
export class PlaningTableComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  constructor(
    private route: ActivatedRoute,
    private planingService: PlaningService,
    private dialog: MatDialog
  ) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  searchTerm: string = '';
  currentPlanningId: string = '';
  planningDetails: Planning | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentPlanningId = params['id'];
        console.log('Initialized currentPlanningId:', this.currentPlanningId);
        this.loadPlanningDetails(this.currentPlanningId);
      } else {
        console.error('No id parameter found in the route');
      }
    });
  }

  loadPlanningDetails(id: string) {
    console.log('Loading planning details for id:', id);
    this.planingService.getPlanningByID(id).subscribe({
      next: (data: Planning) => {
        this.planningDetails = data;
        console.log('Fetched planning details:', data);
      },
      error: (error) => {
        console.error('Error fetching planning details:', error);
      },
      complete: () => {
        console.log('Fetching planning details completed');
      }
    });
  }

  openSubplanningDialog(): void {
    console.log('Opening subplanning dialog. Current planning ID:', this.currentPlanningId);
    if (!this.currentPlanningId) {
      console.error('No planning ID available');
      return;
    }

    const dialogRef = this.dialog.open(SubplanningformComponent, {
      minWidth: '800px',
      maxHeight: '500px',
      data: { planningID: this.currentPlanningId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed. Result:', result);
      if (result) {
        console.log('Reloading planning details. Current planning ID:', this.currentPlanningId);
        this.loadPlanningDetails(this.currentPlanningId);
      }
    });
  }
}
