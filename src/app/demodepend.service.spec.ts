import { TestBed } from '@angular/core/testing';

import { DemodependService } from './demodepend.service';

describe('DemodependService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemodependService = TestBed.get(DemodependService);
    expect(service).toBeTruthy();
  });
});
