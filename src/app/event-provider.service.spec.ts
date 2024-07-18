import { TestBed } from '@angular/core/testing';

import { EventProviderService } from './event-provider.service';

describe('EventProviderService', () => {
  let service: EventProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
