/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilingService } from './filing.service';

describe('Service: filing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilingService]
    });
  });

  it('should ...', inject([FilingService], (service: FilingService) => {
    expect(service).toBeTruthy();
  }));
});
