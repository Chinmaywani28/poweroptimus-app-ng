import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SankeytwoComponent } from './sankeytwo.component';

describe('SankeytwoComponent', () => {
  let component: SankeytwoComponent;
  let fixture: ComponentFixture<SankeytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SankeytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SankeytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
