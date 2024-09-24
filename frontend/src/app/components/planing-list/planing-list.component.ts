import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../../services/planing/planing-service.service';
import { Planning } from '../planing-form/planing-form.component';
import { Service } from '../../services/shareServices/plannig-noti.service';

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
    if (
      confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบแผนการเดินทาง "${plan.tripName}"?`)
    ) {
      this.planingService.deletePlanning(plan._id).subscribe(
        () => {
          console.log('ลบแผนการเดินทางสำเร็จ');
          this.travelPlans = this.travelPlans.filter((p) => p._id !== plan._id);
          this.filterPlans();
          this.planningNotificationService.notifyPlansUpdated();
        },
        (error) => {
          console.error('เกิดข้อผิดพลาดในการลบแผนการเดินทาง:', error);
          // จัดการข้อผิดพลาด (เช่น แสดงข้อความแจ้งเตือนให้ผู้ใช้)
        }
      );
    }
  }
  planningDetails: Planning | null = null;

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
