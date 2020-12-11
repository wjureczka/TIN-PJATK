import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerProducerPanelComponent } from './beer-producer-panel.component';

describe('BeerProducerPanelComponent', () => {
  let component: BeerProducerPanelComponent;
  let fixture: ComponentFixture<BeerProducerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerProducerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerProducerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
