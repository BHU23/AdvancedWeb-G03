import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningNotificationService {
  private plansUpdatedSource = new BehaviorSubject<void>(undefined);
  plansUpdated$ = this.plansUpdatedSource.asObservable();

  notifyPlansUpdated() {
    this.plansUpdatedSource.next();
  }
}
