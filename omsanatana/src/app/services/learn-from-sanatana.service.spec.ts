import { TestBed } from '@angular/core/testing';

import { LearnFromSanatanaService } from './learn-from-sanatana.service';

describe('LearnFromSanatanaService', () => {
  let service: LearnFromSanatanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearnFromSanatanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
