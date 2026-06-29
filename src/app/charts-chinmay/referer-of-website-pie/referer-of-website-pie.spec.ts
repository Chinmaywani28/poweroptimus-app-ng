import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefererOfWebsitePieComponent } from './referer-of-website-pie';

describe('RefererOfWebsitePieComponent', () => {
  let component: RefererOfWebsitePieComponent;
  let fixture: ComponentFixture<RefererOfWebsitePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefererOfWebsitePieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefererOfWebsitePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
