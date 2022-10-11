import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinLoadPhotosComponent } from './alaadin-load-photos.component';

describe('AlaadinLoadPhotosComponent', () => {
  let component: AlaadinLoadPhotosComponent;
  let fixture: ComponentFixture<AlaadinLoadPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinLoadPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinLoadPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
