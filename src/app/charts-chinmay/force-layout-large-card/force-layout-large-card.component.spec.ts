import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapTwoComponent } from './force-layout-large-card.component';

describe('HeatMapTwoComponent', () => {
  let component: HeatMapTwoComponent;
  let fixture: ComponentFixture<HeatMapTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatMapTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatMapTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
