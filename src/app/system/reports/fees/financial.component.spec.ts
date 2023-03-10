import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesComponent } from './financial.component';

describe('FinancialComponent', () => {
  let component: FeesComponent;
  let fixture: ComponentFixture<FeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
