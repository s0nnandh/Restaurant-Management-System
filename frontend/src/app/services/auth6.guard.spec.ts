import { TestBed } from '@angular/core/testing';

import { Auth6Guard } from './auth6.guard';

describe('Auth6Guard', () => {
  let guard: Auth6Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth6Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
