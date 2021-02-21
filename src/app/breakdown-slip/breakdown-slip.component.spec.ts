import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownSlipComponent } from './breakdown-slip.component';

describe('BreakdownSlipComponent', () => {
  let component: BreakdownSlipComponent;
  let fixture: ComponentFixture<BreakdownSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakdownSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
