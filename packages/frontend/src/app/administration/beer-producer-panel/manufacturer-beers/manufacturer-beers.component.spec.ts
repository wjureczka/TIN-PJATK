import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerBeersComponent } from './manufacturer-beers.component';

describe('ManufacturerBeersComponent', () => {
  let component: ManufacturerBeersComponent;
  let fixture: ComponentFixture<ManufacturerBeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerBeersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
