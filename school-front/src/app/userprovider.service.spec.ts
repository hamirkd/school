import { TestBed } from '@angular/core/testing';

import { UserproviderService } from './userprovider.service';

describe('UserproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserproviderService = TestBed.get(UserproviderService);
    expect(service).toBeTruthy();
  });
});
