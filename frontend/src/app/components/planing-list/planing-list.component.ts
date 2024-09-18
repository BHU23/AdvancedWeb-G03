import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../../services/planing/planing-service.service';
import { Planning } from '../planing-form/planing-form.component';

@Component({
  selector: 'app-planing-list',
  templateUrl: './planing-list.component.html',
  styleUrls: ['./planing-list.component.css']
})
export class PlaningListComponent implements OnInit {
    travelPlans: Planning[] = [
      {
        tripName: 'Travel Title 1',
        startDate: new Date('1967-09-11'),
        endDate: new Date('1967-09-17'),
        budget: '200k-300k Baht',
        description: 'Body text for whatever you would like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.',
        status: 'Planned',
        tripID: 0,

      },
      {
        tripName: 'Travel Title 2',
        startDate: new Date('1967-10-20'),
        endDate: new Date('1967-10-25'),
        budget: '100k-150k Baht',
        description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
        status: 'cancelled',
        tripID: 0,
      },
  ];

  constructor(private planingService: PlaningService) { }

  ngOnInit(): void {
    this.loadTravelPlans();
  }

  loadTravelPlans(): void {
    this.planingService.getAllPlannings().subscribe(
      (data: Planning[]) => {
        this.travelPlans = data;
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

  filteredPlans = [...this.travelPlans]; // Initialize with all plans
  selectedCategory = ''; // This will be used to filter plans

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

}
