import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlanOntime, SubplanningformComponent } from '../subplanningform/subplanningform.component';
import { MatDialog } from '@angular/material/dialog';
import { Planning } from '../planing-form/planing-form.component';
import { ActivatedRoute } from '@angular/router';
import { PlaningService } from '../../services/planing/planing-service.service';

@Component({
  selector: 'app-planing-table',
  templateUrl: './planing-table.component.html',
  styleUrls: ['./planing-table.component.css']
})
export class PlaningTableComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  constructor(
    private route: ActivatedRoute,
    private planingService: PlaningService,
    private dialog: MatDialog
  ) {}

  searchTerm: string = '';
  currentPlanningId: string = '';
  planningDetails: Planning | null = null;
  planOntimes: PlanOntime[] = [];
  places: { [key: string]: { name: string; address: string; rating: number; description: string } } = {};


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentPlanningId = params['id'];
        this.loadPlanningDetails(this.currentPlanningId);
        this.loadPlanOntimes(this.currentPlanningId);
      }
    });
  }

  loadPlanningDetails(id: string) {
    this.planingService.getPlanningByID(id).subscribe({
      next: (data: Planning) => {
        this.planningDetails = data;
      },
      error: (error) => {
        console.error('Error fetching planning details:', error);
      }
    });
  }

  loadPlanOntimes(id: string) {
    this.planingService.getSubplannigByPlanningID(id).subscribe({
      next: (data: PlanOntime[]) => {
        this.planOntimes = data;
        this.loadPlaces(data); // เรียกฟังก์ชันเพื่อโหลดข้อมูลสถานที่
      },
      error: (error) => {
        console.error('Error fetching PlanOntimes:', error);
      }
    });
  }

  loadPlaces(planOntimes: PlanOntime[]) {
  const placeIDs = planOntimes.map(p => p.placeID.toString()); // แปลง placeID เป็น string
    placeIDs.forEach(placeID => {
      this.planingService.getPlaceByID(placeID).subscribe({
        next: (place) => {
          this.places[placeID] = place; // เก็บข้อมูลสถานที่ตาม placeID
        },
        error: (error) => {
          console.error(`Error fetching place with ID ${placeID}:`, error);
        }
      });
    });
  }

  deletePlanOntime(id: string): void {
    this.planingService.deletePlanOnTime(id).subscribe({
      next: () => {
        this.planOntimes = this.planOntimes.filter(planOntime => planOntime._id !== id);
        console.log(`Deleted PlanOntime with ID: ${id}`);
      },
      error: (error) => {
        console.error(`Error deleting PlanOntime with ID ${id}:`, error);
      }
    });
  }


  openSubplanningDialog(): void {
    const dialogRef = this.dialog.open(SubplanningformComponent, {
      minWidth: '800px',
      maxHeight: '500px',
      data: { planningID: this.currentPlanningId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPlanOntimes(this.currentPlanningId);
      }
    });
  }

  filterPlanOntimes() {
    if (!this.searchTerm) {
      return this.planOntimes;
    }
    return this.planOntimes.filter(planOntime =>
      planOntime.planName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
