import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarListingComponent } from './bar-listing.component';

describe('BarListingComponent', () => {
  let component: BarListingComponent;
  let fixture: ComponentFixture<BarListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
