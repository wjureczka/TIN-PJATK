import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarMenuComponent } from './edit-bar-menu.component';

describe('EditBarMenuComponent', () => {
  let component: EditBarMenuComponent;
  let fixture: ComponentFixture<EditBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
