import { TestBed } from '@angular/core/testing';

import { PreviasService } from './previas.service';

describe('PreviasService', () => {
  let service: PreviasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
