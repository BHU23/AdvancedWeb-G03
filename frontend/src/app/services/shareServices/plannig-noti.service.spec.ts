import { TestBed } from '@angular/core/testing';

import { Service } from './plannig-noti.service';

describe('PlannigNotiService', () => {
  let service: Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
