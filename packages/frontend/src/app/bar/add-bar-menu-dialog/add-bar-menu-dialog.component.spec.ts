import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarMenuDialogComponent } from './add-bar-menu-dialog.component';

describe('AddBarMenuDialogComponent', () => {
  let component: AddBarMenuDialogComponent;
  let fixture: ComponentFixture<AddBarMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBarMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBarMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
