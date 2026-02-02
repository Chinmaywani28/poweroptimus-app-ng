import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeCardTwoComponent } from './large-card-two.component';

describe('LargeCardTwoComponent', () => {
  let component: LargeCardTwoComponent;
  let fixture: ComponentFixture<LargeCardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeCardTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
