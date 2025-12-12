import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmissionDataService } from './emission-data.service';

describe('EmissionDataService', () => {
  let service: EmissionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmissionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

