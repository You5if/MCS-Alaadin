import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinUploadComponent } from './alaadin-upload.component';

describe('AlaadinUploadComponent', () => {
  let component: AlaadinUploadComponent;
  let fixture: ComponentFixture<AlaadinUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
