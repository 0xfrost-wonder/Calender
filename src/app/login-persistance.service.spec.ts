import { TestBed } from '@angular/core/testing';

import { LoginPersistanceService } from './login-persistance.service';

describe('LoginPersistanceService', () => {
  let service: LoginPersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
