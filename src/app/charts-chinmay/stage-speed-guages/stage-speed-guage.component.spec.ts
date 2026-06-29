import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSpeedGuageComponent } from './stage-speed-guage.component';

describe('StageSpeedGuageComponent', () => {
  let component: StageSpeedGuageComponent;
  let fixture: ComponentFixture<StageSpeedGuageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageSpeedGuageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageSpeedGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
