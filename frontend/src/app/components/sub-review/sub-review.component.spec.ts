import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReviewComponent } from './sub-review.component';

describe('SubReviewComponent', () => {
  let component: SubReviewComponent;
  let fixture: ComponentFixture<SubReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
