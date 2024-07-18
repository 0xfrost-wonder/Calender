import { TestBed } from '@angular/core/testing';

import { ViewSwitcherService } from './view-switcher.service';

describe('ViewSwitcherService', () => {
  let service: ViewSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
