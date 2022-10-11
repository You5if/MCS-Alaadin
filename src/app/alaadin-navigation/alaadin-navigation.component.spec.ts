import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinNavigationComponent } from './alaadin-navigation.component';

describe('AlaadinNavigationComponent', () => {
  let component: AlaadinNavigationComponent;
  let fixture: ComponentFixture<AlaadinNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
