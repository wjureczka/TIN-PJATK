import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarListingItemComponent } from './bar-listing-item.component';

describe('BarListingItemComponent', () => {
  let component: BarListingItemComponent;
  let fixture: ComponentFixture<BarListingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarListingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
