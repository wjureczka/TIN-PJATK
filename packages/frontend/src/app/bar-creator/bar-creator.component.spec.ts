import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCreatorComponent } from './bar-creator.component';

describe('BarCreatorComponent', () => {
  let component: BarCreatorComponent;
  let fixture: ComponentFixture<BarCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
