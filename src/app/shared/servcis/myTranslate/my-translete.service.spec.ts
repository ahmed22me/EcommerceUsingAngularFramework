import { TestBed } from '@angular/core/testing';

import { MyTransleteService } from './my-translete.service';

describe('MyTransleteService', () => {
  let service: MyTransleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTransleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
