import { TestBed } from '@angular/core/testing';

import { Auth5Guard } from './auth5.guard';

describe('Auth5Guard', () => {
  let guard: Auth5Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth5Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
