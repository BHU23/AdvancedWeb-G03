// import { Component } from '@angular/core';
// import { PlaningService } from '../../services/planing/planing-service.service';
// import { Planning } from '../planing-form/planing-form.component';

// // interface TravelPlan {
// //   title: string;
// //   dateRange: string;
// //   budget: string;
// //   description: string;
// //   status: string;
// //   imageUrl: string;
// // }

// // src/app/models/travel-plan.model.ts
// export interface TravelPlan {
//   title: string;
//   dateRange: string;
//   budget: string;
//   description: string;
//   status: string;
//   imageUrl: string;
// }


// @Component({
//   selector: 'app-planing-list',
//   templateUrl: './planing-list.component.html',
//   styleUrl: './planing-list.component.css'
// })
// export class PlaningListComponent {
//   // travelPlans: TravelPlan[] = [
//   //   {
//   //     title: 'Travel Title 1',
//   //     dateRange: '11-09-67 To 15-09-67',
//   //     budget: '200k-300k Baht',
//   //     description: 'Body text for whatever youd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
//   //     status: 'Planned',
//   //     imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png' // ตัวอย่าง URL รูปภาพ
//   //   },
//   //   {
//   //     title: 'Travel Title 2',
//   //     dateRange: '20-10-67 To 25-10-67',
//   //     budget: '100k-150k Baht',
//   //     description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
//   //     status: 'Planning',
//   //     imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png'
//   //   },
//   //   {
//   //     title: 'Travel Title 2',
//   //     dateRange: '20-10-67 To 25-10-67',
//   //     budget: '100k-150k Baht',
//   //     description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
//   //     status: 'Planning',
//   //     imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png'
//   //   },{
//   //     title: 'Travel Title 2',
//   //     dateRange: '20-10-67 To 25-10-67',
//   //     budget: '100k-150k Baht',
//   //     description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
//   //     status: 'Planning',
//   //     imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png'
//   //   },{
//   //     title: 'Travel Title 2',
//   //     dateRange: '20-10-67 To 25-10-67',
//   //     budget: '100k-150k Baht',
//   //     description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
//   //     status: 'Planning',
//   //     imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png'
//   //   },
//   // ];

//   travelPlans: TravelPlan[] = [];

//   constructor(private planingService: PlaningService) { }

//   ngOnInit(): void {
//     this.loadTravelPlans();
//   }

//   loadTravelPlans(): void {
//     this.planingService.getAllPlannings().subscribe(
//       (data: Planning[]) => {
//         this.travelPlans = this.convertToTravelPlan(data);
//       },
//       error => {
//         console.error('Error fetching travel plans', error);
//       }
//     );
//   }

//   private convertToTravelPlan(plannings: Planning[]): TravelPlan[] {
//     return plannings.map(plan => ({
//       title: plan.tripName,
//       dateRange: `${plan.startDate} - ${plan.endDate}`,
//       budget: plan.budget,
//       description: plan.description || 'No description available', // ใช้ค่าเริ่มต้นหาก description เป็น undefined
//       status: plan.status,
//       imageUrl: '' // คุณอาจจะต้องใช้ค่าจริงหากมีข้อมูลภาพ
//     }));
//   }

// }

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
        userID: 1
      },
      {
        tripName: 'Travel Title 2',
        startDate: new Date('1967-10-20'),
        endDate: new Date('1967-10-25'),
        budget: '100k-150k Baht',
        description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
        status: 'cancelled',
        tripID: 0,
        userID: 1
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
