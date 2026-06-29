import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisLineWithTickBarComponent } from './dynamic-data-plus-time-axis.component';

describe('AxisLineWithTickBarComponent', () => {
  let component: AxisLineWithTickBarComponent;
  let fixture: ComponentFixture<AxisLineWithTickBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxisLineWithTickBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxisLineWithTickBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
