import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefererOfWebsitePieLargeCardComponent } from './referer-of-website-pie-large-card.component';

describe('RefererOfWebsitePieLargeCardComponent', () => {
  let component: RefererOfWebsitePieLargeCardComponent;
  let fixture: ComponentFixture<RefererOfWebsitePieLargeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefererOfWebsitePieLargeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefererOfWebsitePieLargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
