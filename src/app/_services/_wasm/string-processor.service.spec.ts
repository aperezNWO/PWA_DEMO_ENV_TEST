import { TestBed } from '@angular/core/testing';

import { StringProcessorService } from './string-processor.service';

describe('StringProcessorService', () => {
  let service: StringProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
