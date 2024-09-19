import { TestBed } from '@angular/core/testing';

import { PlanningNotificationService } from './plannig-noti.service';

describe('PlannigNotiService', () => {
  let service: PlanningNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
