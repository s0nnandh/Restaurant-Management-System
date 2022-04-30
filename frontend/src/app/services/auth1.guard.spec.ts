import { TestBed } from '@angular/core/testing';

import { Auth1Guard } from './auth1.guard';

describe('Auth1Guard', () => {
  let guard: Auth1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
