import { TestBed } from '@angular/core/testing';

import { PlaningService } from './planing-service.service';

describe('PlaningServiceService', () => {
  let service: PlaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
