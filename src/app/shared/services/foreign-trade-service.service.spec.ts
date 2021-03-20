import { TestBed } from '@angular/core/testing';

import { ForeignTradeServiceService } from './foreign-trade-service.service';

describe('ForeignTradeServiceService', () => {
  let service: ForeignTradeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignTradeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
