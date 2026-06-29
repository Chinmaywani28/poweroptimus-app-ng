import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterfallChartBarComponent } from './stacked-bar-with-border';

describe('WaterfallChartBarComponent', () => {
  let component: WaterfallChartBarComponent;
  let fixture: ComponentFixture<WaterfallChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterfallChartBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterfallChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
