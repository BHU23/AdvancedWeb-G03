import { Component, OnInit } from '@angular/core';
import { Planning } from '../../components/planing-form/planing-form.component';
import { ActivatedRoute } from '@angular/router';
import { PlaningService } from '../../services/planing/planing-service.service';
import { EditplanningComponent } from '../../components/editplanning/editplanning.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-planing',
  templateUrl: './sub-planing.component.html',
  styleUrl: './sub-planing.component.css'
})
export class SubPlaningComponent implements OnInit {
  planningDetails!: Planning;

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
          console.log('สถานะการวางแผนถูกอัปเดตเป็นเสร็จสมบูรณ์', response);
          this.loadPlanningDetails(this.planningDetails!._id);
        },
        error: (error) => {
          console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะการวางแผน', error);
        },
        complete: () => {
          console.log('กระบวนการอัปเดตสถานะการวางแผนเสร็จสมบูรณ์');

          Swal.fire({
            title: "แผนการเดินทางเสร็จสมบูรณ์!",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://media.tenor.com/TpjDygRMcq0AAAAM/katy-perry-woah.gif")
              center top
              no-repeat
            `
          });
        }
      });
    }
  }




  updateStatusToCanceled() {
    if (this.planningDetails && this.planningDetails._id) {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณจะไม่สามารถย้อนกลับได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ยกเลิกเลย!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.planingService.updatePlanningStatusCancel(this.planningDetails._id).subscribe({
            next: (response) => {
              console.log('สถานะการวางแผนถูกอัปเดตเป็นยกเลิก', response);
              this.loadPlanningDetails(this.planningDetails._id);
            },
            error: (error) => {
              console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะการวางแผน', error);
            },
            complete: () => {
              Swal.fire({
                title: "ยกเลิกแล้ว!",
                text: "สถานะการวางแผนได้ถูกอัปเดตเป็นยกเลิกแล้ว.",
                icon: "success"
              });
              console.log('กระบวนการอัปเดตสถานะการวางแผนเป็นยกเลิกเสร็จสมบูรณ์');
            }
          });
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
        // โหลดข้อมูลแผนการเดินทางใหม่หลังจากปิด dialog
        this.loadPlanningDetails(planning._id);

        // แสดง SweetAlert ว่าการอัปเดตสำเร็จ
        Swal.fire({
          position: "center",
          icon: "success",
          title: "อัพเดตข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
