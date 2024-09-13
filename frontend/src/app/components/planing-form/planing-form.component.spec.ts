import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningFormComponent } from './planing-form.component';

describe('PlaningFormComponent', () => {
  let component: PlaningFormComponent;
  let fixture: ComponentFixture<PlaningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaningFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
