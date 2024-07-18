import { TestBed } from '@angular/core/testing';

import { CalendarActionsService } from './calendar-actions.service';

describe('CalendarActionsService', () => {
  let service: CalendarActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
