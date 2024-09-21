import { Pipe, PipeTransform } from '@angular/core';
import { PlanOntime } from '../subplanningform/subplanningform.component';

@Pipe({
  name: 'filterPlanOntimes'
})
export class FilterPlanOntimesPipe implements PipeTransform {
  transform(planOntimes: PlanOntime[], searchTerm: string): PlanOntime[] {
    if (!planOntimes || !searchTerm) {
      return planOntimes; // ถ้าไม่มีข้อมูลหรือคำค้นคืนค่าข้อมูลทั้งหมด
    }
    return planOntimes.filter(planOntime =>
      planOntime.planName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
