import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../../services/planing/planing-service.service';
import { Planning } from '../planing-form/planing-form.component';
import { PlanningNotificationService } from '../../services/shareServices/plannig-noti.service';

@Component({
  selector: 'app-planing-list',
  templateUrl: './planing-list.component.html',
  styleUrls: ['./planing-list.component.css']
})
export class PlaningListComponent implements OnInit {
  travelPlans: Planning[] = [];
  filteredPlans: Planning[] = [];
  selectedCategory = '';
  sortOrder: 'asc' | 'desc' = 'desc'; // Default to descending

  constructor(
    private planingService: PlaningService,
    private planningNotificationService: PlanningNotificationService // Inject the service
  ) {}

  ngOnInit(): void {
    this.loadTravelPlans();

    // Subscribe to the plansUpdated observable to refresh the list
    this.planningNotificationService.plansUpdated$.subscribe(() => {
      this.loadTravelPlans();
    });
  }

  loadTravelPlans(): void {
    this.planingService.getUserPlannings().subscribe(
      (data: Planning[]) => {
        this.travelPlans = this.sortPlans(data);
        this.filteredPlans = [...this.travelPlans];
        console.log('Fetched data:', data);
      },
      error => {
        console.error('Error fetching travel plans:', error);
        if (error.status === 0) {
          console.error('Network error or CORS issue');
        } else {
          console.error(`HTTP error: ${error.status} - ${error.statusText}`);
        }
      }
    );
  }

  sortPlans(plans: Planning[]): Planning[] {
    return plans.sort((a, b) => {
      // Adjust sorting logic here as needed
      const comparison = a.tripID - b.tripID; // Example: Sort by tripID
      return this.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.filterPlans();
  }

  filterPlans() {
    if (this.selectedCategory === '') {
      this.filteredPlans = [...this.travelPlans];
    } else {
      this.filteredPlans = this.travelPlans.filter(plan => plan.status.toLowerCase() === this.selectedCategory.toLowerCase());
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.travelPlans = this.sortPlans(this.travelPlans);
    this.filteredPlans = [...this.travelPlans];
  }
}
