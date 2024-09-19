import { Component, OnInit } from '@angular/core';
import { Planning } from '../../components/planing-form/planing-form.component';
import { ActivatedRoute } from '@angular/router';
import { PlaningService } from '../../services/planing/planing-service.service';

@Component({
  selector: 'app-sub-planing',
  templateUrl: './sub-planing.component.html',
  styleUrl: './sub-planing.component.css'
})
export class SubPlaningComponent implements OnInit {
  planningDetails: Planning | null = null;

  constructor(
    private route: ActivatedRoute,
    private planingService: PlaningService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPlanningDetails(id);
      }
    });
  }

  loadPlanningDetails(id: string) {
    this.planingService.getPlanningByID(id).subscribe(

      (data: Planning) => {
        this.planningDetails = data;
        console.log('Fetched planning details:', data);
      },
      error => {
        console.error('Error fetching planning details:', error);
      }
    );
  }

  getStatusClass(): string {
    switch (this.planningDetails?.status.toLowerCase()) {
      case 'planned':
        return 'planned';
      case 'in progress':
        return 'in-progress';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  }


  safeGet(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
