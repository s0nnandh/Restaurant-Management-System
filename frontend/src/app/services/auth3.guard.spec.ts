import { TestBed } from '@angular/core/testing';

import { Auth3Guard } from './auth3.guard';

describe('Auth3Guard', () => {
  let guard: Auth3Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth3Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
