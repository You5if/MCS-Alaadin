import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaadinNotesComponent } from './alaadin-notes.component';

describe('AlaadinNotesComponent', () => {
  let component: AlaadinNotesComponent;
  let fixture: ComponentFixture<AlaadinNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlaadinNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaadinNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
