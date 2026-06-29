import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieWithPadAngleLargeCardComponent } from './pie-with-padAngle-large-card.component';

describe('PieWithPadAngleLargeCardComponent', () => {
  let component: PieWithPadAngleLargeCardComponent;
  let fixture: ComponentFixture<PieWithPadAngleLargeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieWithPadAngleLargeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieWithPadAngleLargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
