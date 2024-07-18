import { TestBed } from '@angular/core/testing';

import { CalendarQueryBuilderService } from './calendar-query-builder.service';

describe('CalendarQueryBuilderService', () => {
  let service: CalendarQueryBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarQueryBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
