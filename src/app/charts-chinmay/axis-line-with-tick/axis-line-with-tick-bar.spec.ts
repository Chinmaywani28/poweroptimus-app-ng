import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisLineWithTickBarComponent } from './axis-line-with-tick-bar';

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
