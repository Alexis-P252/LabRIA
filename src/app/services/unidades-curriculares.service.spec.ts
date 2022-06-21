import { TestBed } from '@angular/core/testing';

import { UnidaesCurricularesService } from './unidades-curriculares.service';

describe('UnidaesCurricularesService', () => {
  let service: UnidaesCurricularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidaesCurricularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
