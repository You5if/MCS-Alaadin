import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinClientDataComponent } from './alaadin-client-data.component';

describe('AlaadinClientDataComponent', () => {
  let component: AlaadinClientDataComponent;
  let fixture: ComponentFixture<AlaadinClientDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinClientDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinClientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
