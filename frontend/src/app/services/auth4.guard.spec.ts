import { TestBed } from '@angular/core/testing';

import { Auth4Guard } from './auth4.guard';

describe('Auth4Guard', () => {
  let guard: Auth4Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth4Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
