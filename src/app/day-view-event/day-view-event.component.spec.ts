import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewEventComponent } from './day-view-event.component';

describe('DayViewEventComponent', () => {
  let component: DayViewEventComponent;
  let fixture: ComponentFixture<DayViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
