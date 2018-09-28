import { TestBed } from '@angular/core/testing';

import { CourproviderService } from './courprovider.service';

describe('CourproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourproviderService = TestBed.get(CourproviderService);
    expect(service).toBeTruthy();
  });
});
