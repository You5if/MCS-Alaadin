import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinChangePasswordComponent } from './alaadin-change-password.component';

describe('AlaadinChangePasswordComponent', () => {
  let component: AlaadinChangePasswordComponent;
  let fixture: ComponentFixture<AlaadinChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
