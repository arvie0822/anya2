/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShiftService } from './shift.service';

describe('Service: ShiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftService]
    });
  });

  it('should ...', inject([ShiftService], (service: ShiftService) => {
    expect(service).toBeTruthy();
  }));
});
