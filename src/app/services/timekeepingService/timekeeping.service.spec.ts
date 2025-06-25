/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimekeepingService } from './timekeeping.service';

describe('Service: Timekeeping', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimekeepingService]
    });
  });

  it('should ...', inject([TimekeepingService], (service: TimekeepingService) => {
    expect(service).toBeTruthy();
  }));
});
