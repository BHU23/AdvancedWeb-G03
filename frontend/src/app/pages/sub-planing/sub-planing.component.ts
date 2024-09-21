import { Component, OnInit } from '@angular/core';
import { Planning } from '../../components/planing-form/planing-form.component';
import { ActivatedRoute } from '@angular/router';
import { PlaningService } from '../../services/planing/planing-service.service';
import { EditplanningComponent } from '../../components/editplanning/editplanning.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-planing',
  templateUrl: './sub-planing.component.html',
  styleUrl: './sub-planing.component.css'
})
export class SubPlaningComponent implements OnInit {
  planningDetails: Planning | null = null;

  constructor(
    private route: ActivatedRoute,
    private planingService: PlaningService,
    private dialog: MatDialog
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


  getStatusClass(): string {
    switch (this.planningDetails?.status.toLowerCase()) {
      case 'planned':
        return 'planned';
      case 'in progress':
        return 'in-progress';
      case 'cancelled':
      case 'canceled':
        return 'cancelled';
      case 'completed':
        return 'completed';
      default:
        return '';
    }
  }

  safeGet(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  updateStatusToCompleted() {
    if (this.planningDetails?._id) {
      this.planingService.updatePlanningStatusComplete(this.planningDetails._id).subscribe({
        next: (response) => {
          console.log('Planning status updated to completed', response);
          this.loadPlanningDetails(this.planningDetails!._id);
        },
        error: (error) => {
          console.error('Error updating planning status', error);
        },
        complete: () => {
          console.log('Planning status update process completed');
        }
      });
    }
  }


  updateStatusToCanceled() {
    if (this.planningDetails?._id) {
      this.planingService.updatePlanningStatusCancel(this.planningDetails._id).subscribe({
        next: (response) => {
          console.log('Planning status updated to canceled', response);
          this.loadPlanningDetails(this.planningDetails!._id);
        },
        error: (error) => {
          console.error('Error updating planning status', error);
        },
        complete: () => {
          console.log('Planning status update to canceled process completed');
        }
      });
    }
  }


  openEditDialog(planning: Planning) {
    const dialogRef = this.dialog.open(EditplanningComponent, {
      width: '500px',
      data: { planning: planning }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // อัพเดตข้อมูลใน component หลักหลังจาก dialog ปิด
        this.loadPlanningDetails(planning._id);
      }
    });
  }
}
