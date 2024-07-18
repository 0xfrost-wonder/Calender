import { TestBed } from '@angular/core/testing';

import { OperationIndicationService } from './operation-indication.service';

describe('OperationIndicationService', () => {
  let service: OperationIndicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationIndicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
