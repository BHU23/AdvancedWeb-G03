import { TestBed } from '@angular/core/testing';

import { PlaceService } from './place.service';

describe('CreatePlaceService', () => {
  let service: PlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
