import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPlaningComponent } from './sub-planing.component';

describe('SubPlaningComponent', () => {
  let component: SubPlaningComponent;
  let fixture: ComponentFixture<SubPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubPlaningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
