import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningTableComponent } from './planing-table.component';

describe('PlaningTableComponent', () => {
  let component: PlaningTableComponent;
  let fixture: ComponentFixture<PlaningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaningTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
