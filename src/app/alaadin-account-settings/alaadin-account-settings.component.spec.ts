import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinAccountSettingsComponent } from './alaadin-account-settings.component';

describe('AlaadinAccountSettingsComponent', () => {
  let component: AlaadinAccountSettingsComponent;
  let fixture: ComponentFixture<AlaadinAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinAccountSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
