import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubplanningformComponent } from './subplanningform.component';

describe('SubplanningformComponent', () => {
  let component: SubplanningformComponent;
  let fixture: ComponentFixture<SubplanningformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubplanningformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubplanningformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
