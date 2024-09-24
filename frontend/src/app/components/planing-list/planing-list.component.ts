import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../../services/planing/planing-service.service';
import { Planning } from '../planing-form/planing-form.component';
import { Service } from '../../services/shareServices/plannig-noti.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planing-list',
  templateUrl: './planing-list.component.html',
  styleUrls: ['./planing-list.component.css'],
})
export class PlaningListComponent implements OnInit {
  travelPlans: Planning[] = [];
  filteredPlans: Planning[] = [];
  selectedCategory = '';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private planingService: PlaningService,
    private planningNotificationService: Service
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
      (error) => {
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
      const comparison = a.tripID - b.tripID;
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
      this.filteredPlans = this.travelPlans.filter(
        (plan) =>
          plan.status.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.travelPlans = this.sortPlans(this.travelPlans);
    this.filteredPlans = [...this.travelPlans];
  }

  deletePlan(plan: Planning) {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณแน่ใจหรือไม่ว่าต้องการลบแผนการท่องเที่ยว "${plan.tripName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      // If user confirmed deletion
      if (result.isConfirmed) {
        this.planingService.deletePlanning(plan._id).subscribe(
          () => {
            console.log('ลบแผนการเดินทางสำเร็จ');
            // Remove the plan from the local array
            this.travelPlans = this.travelPlans.filter((p) => p._id !== plan._id);
            this.filterPlans();
            this.planningNotificationService.notifyPlansUpdated();

            // Show success message after deletion
            Swal.fire({
              title: "ลบแล้ว!",
              text: "แผนการท่องเที่ยวของคุณได้ถูกลบแล้ว.",
              icon: "success",
            });
          },
          (error) => {
            console.error('เกิดข้อผิดพลาดในการลบแผนการเดินทาง:', error);
            // Handle error (e.g., show a notification message to the user)
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่สามารถลบแผนการเดินทางได้. กรุณาลองใหม่ในภายหลัง.",
              icon: "error",
            });
          }
        );
      }
    });
  }


  getStatusClass(status: string) {
    switch (status) {
      case 'planned':
        return 'status-planned';
      case 'completed':
        return 'status-completed';
      case 'canceled':
        return 'status-canceled';
      default:
        return 'status-default';
    }
  }
}
